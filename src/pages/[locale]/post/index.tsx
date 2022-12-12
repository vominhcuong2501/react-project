// import style from '@scss/pages/post.scss';
import { originRequest } from '@utils/api';
import Link from 'next/link';

import { MainLayout } from '@components/compound';
import { Post as IPost, PostProps } from '@interfaces/post';

export default function Post({ postList }: PostProps) {
  return (
    <>
      {/* <style jsx>{style}</style> */}
      <div>
        list post
        <h1>List Post</h1>
        <ul>
          {postList?.map((item: IPost) => (
            <li key={item.id}>
              <strong>
                <Link href={`en-mi/post/${encodeURIComponent(item.id)}`}>{item.title}</Link>
              </strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const response = await originRequest('https://jsonplaceholder.typicode.com/posts');

  return {
    props: { postList: response },
  };
}

Post.Layout = MainLayout;
