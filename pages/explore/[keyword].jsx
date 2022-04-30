import { useRouter } from "next/router";
import { Button, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchKeyword({ books }) {
  const router = useRouter();
  const [lens, setLens] = useState(0);

  useEffect(() => {
    setLens(books.items.length);
    // console.log(lens);
    // console.log(books.items[0].isbn.split(" ")[1]);
  }, []);

  return (
    <div>
      {lens ? (
        <>
          <div className="wrap">
            <Grid columns={4}>
              <Grid.Row>
                {books.items.map((book) => (
                  <Grid.Column key={book.isbn}>
                    <Link href={`./detail/${book.title}`}>
                      <a>
                        <div>
                          <img
                            src={book.image}
                            alt="DON'T HAVE IMAGE"
                            className="img_book"
                          />
                          <strong className="book_item">{book.title}</strong>
                          <span className="txt_info">
                            {book.publisher},{book.pubdate}
                          </span>
                          <strong className="num_price">${book.price}</strong>
                        </div>
                      </a>
                    </Link>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
            <Link href={`/explore`}>
              <Button color = "black">돌아가기</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: "200px 0", textAlign: "center", fontSize: "35px" }}>
            <Icon name="warning circle" color="red" /> <strong>검색결과가 존재하지 않습니다.</strong><p/>
            <Link href={`/explore`} >
              <Button color = "black">돌아가기</Button>
            </Link>
          </div>
          
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const text = query.keyword; // test용
  const res = await fetch(
    "https://openapi.naver.com/v1/search/book.json?query=" +
      text +
      "&display=20",
    {
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_SECRET,
      },
    }
  );
  const books = await res.json();
  books.items.title = books.items.map((book) => {
    book.title = book.title.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  return {
    props: {
      books: books,
    },
  };
}
