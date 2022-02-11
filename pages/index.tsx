import type { NextPage } from 'next';
import { FieldErrors, useFieldArray, useForm } from 'react-hook-form';
import CustomInput from '../components/custom-input';
import Editor from '../components/editor';

type User = {
  name: string;
  title: string;
  profile: string;
  gender: 'male' | 'female';
  prefectures: string;
  hobbies: string[];
  tasks: {
    value: string;
    limit: string;
  }[];
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
    control,
  } = useForm<User>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'tasks',
  });

  console.log(isSubmitting, isSubmitted, isSubmitSuccessful);

  const onSubmit = async (data: User) => {
    console.log(data);

    // 5秒の送信処理
    const task = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });

    await task;
  };

  const onInvalid = (erros: FieldErrors) => {
    console.log(erros);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div>
        <label>
          名前
          <input
            type="text"
            required
            autoComplete="name"
            {...register('name', {
              required: true,
              maxLength: 30,
            })}
          />
        </label>
        {errors.name?.type === 'required' && '必須入力です'}
        {errors.name?.type === 'maxLength' && '30文字以内にしてください'}
      </div>

      <div>
        <label>
          肩書き
          <CustomInput
            type="text"
            required
            autoComplete="organization-title"
            register={register('title', {
              required: true,
              maxLength: 30,
            })}
          />
        </label>
        {errors.title?.type === 'required' && '必須入力です'}
        {errors.title?.type === 'maxLength' && '30文字以内にしてください'}
      </div>

      <div>
        プロフィール
        <Editor
          control={control}
          name="profile"
          rules={{
            required: true,
            maxLength: 400,
          }}
        />
      </div>

      <div>
        <h2>性別</h2>
        {errors.gender && 'どちらか選択してください'}
        <label>
          <input
            type="radio"
            required
            value="male"
            {...register('gender', {
              required: true,
            })}
          />
          男性
        </label>
        <label>
          <input
            type="radio"
            value="female"
            required
            {...register('gender', {
              required: true,
            })}
          />
          女性
        </label>
      </div>

      <div>
        <label>
          都道府県
          <select
            {...register('prefectures', {
              required: true,
            })}
          >
            <option value="東京">東京</option>
            <option value="沖縄">沖縄</option>
          </select>
        </label>
      </div>

      <div>
        <h2>趣味</h2>
        <label>
          <input type="checkbox" value="格闘技" {...register('hobbies')} />
          格闘技
        </label>
        <label>
          <input type="checkbox" value="IT" {...register('hobbies')} />
          IT
        </label>
        <label>
          <input type="checkbox" value="車" {...register('hobbies')} />車
        </label>
        <label>
          <input type="checkbox" value="旅行" {...register('hobbies')} />
          旅行
        </label>
      </div>

      <div>
        <h2>タスク</h2>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <input
                type="text"
                required
                {...register(`tasks.${index}.value`, {
                  required: true,
                })}
                autoComplete="off"
              />
              <input
                type="date"
                {...register(`tasks.${index}.limit`)}
                autoComplete="off"
              />
              <button type="button" onClick={() => remove(index)}>
                削除
              </button>
            </div>
          );
        })}
        <button type="button" onClick={() => append({})}>
          追加
        </button>
      </div>

      <hr />

      {isSubmitting && <p>送信中...</p>}
      <button disabled={isSubmitting}>送信</button>
    </form>
  );
};

export default Home;
