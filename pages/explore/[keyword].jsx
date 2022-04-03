import { useRouter } from "next/router";

export default function SearchKeyword({ books }) {
    const router = useRouter()
    const keyword = router.query.keyword;

  console.log(books);
  return <>{keyword} 검색 결과</>;
}

export async function getServerSideProps({ query }) {
  const text = query.keyword; // test용
  const res = await fetch(
    "https://openapi.naver.com/v1/search/book.json?query=" +
      text +
      "&display=20",
    {
      headers: {
        "X-Naver-Client-Id": "Zd5ZJu3YKXwcK0Lx4885",
        "X-Naver-Client-Secret": "VInjcz5JIp",
      },
    }
  );
  const books = await res.json();

  return {
    props: {
      books: books,
    },
  };
}
