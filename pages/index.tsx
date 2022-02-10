import type { NextPage } from 'next';
import { FieldErrors, useForm } from 'react-hook-form';
import Editor from '../components/editor';

type User = {
  name: string;
  profile: string;
  gender: 'male' | 'female';
  prefectures: string;
  hobbies: string[];
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<User>();

  const onSubmit = (data: User) => {
    console.log(data);
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

      <button>送信</button>
    </form>
  );
};

export default Home;
