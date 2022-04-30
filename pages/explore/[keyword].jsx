import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchKeyword({ books }) {
  const router = useRouter();
  const [lens, setLens] = useState(0);
  const [filter, setFilter] = useState(false);
  const [descDateFilter, setDescDateFilter] = useState(false);
  const [descPriceFilter, setDescPriceFilter] = useState(false);

  useEffect(() => {
    setLens(books.items.length);
    // console.log(lens);
    // console.log(books.items[0].isbn.split(" ")[1]);
  }, []);

  const toggleFilter = () => {
    setFilter((prev) => !prev);
    console.log("setFilter 작동");
  };

  const toggleDescDateFilter = () => {
    setDescDateFilter((prev) => !prev);
    console.log("setDescDateFilter 작동");
  };

  const toggleDescPriceFilter = () => {
    setDescPriceFilter((prev) => !prev);
    console.log("setDescPriceFilter 작동");
  };

  const TempDescDate = [...books.items];
  TempDescDate.sort((a, b) => b.pubdate - a.pubdate);

  const TempDescPrice = [...books.items];
  TempDescPrice.sort((a, b) => b.price - a.price);

  return (
    <div>
      {lens ? (
        <>
          <div className="wrap">
            <Button onClick={toggleFilter}>정렬</Button>
            <Grid columns={4}>
              <Grid.Row>
                {filter ? (
                  <>
                  <Button onClick={toggleDescDateFilter}>최신 발간 순</Button>
                  <Button onClick={toggleDescPriceFilter}>가격 </Button>
                    {descDateFilter ? (
                      <>
                        {TempDescDate.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <Link href={`./detail/${book.title}`}>
                              <a>
                                <div>
                                  <img
                                    src={book.image}
                                    alt="DON'T HAVE IMAGE"
                                    className="img_book"
                                  />
                                  <strong className="book_item">
                                    {book.title}
                                  </strong>
                                  <span className="txt_info">
                                    {book.publisher},{book.pubdate}
                                  </span>
                                  <strong className="num_price">
                                    ${book.price}
                                  </strong>
                                </div>
                              </a>
                            </Link>
                          </Grid.Column>
                        ))}
                      </>
                    ) : (
                      <>
                        {TempDescPrice.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <Link href={`./detail/${book.title}`}>
                              <a>
                                <div>
                                  <img
                                    src={book.image}
                                    alt="DON'T HAVE IMAGE"
                                    className="img_book"
                                  />
                                  <strong className="book_item">
                                    {book.title}
                                  </strong>
                                  <span className="txt_info">
                                    {book.publisher},{book.pubdate}
                                  </span>
                                  <strong className="num_price">
                                    ${book.price}
                                  </strong>
                                </div>
                              </a>
                            </Link>
                          </Grid.Column>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
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
                              <strong className="book_item">
                                {book.title}
                              </strong>
                              <span className="txt_info">
                                {book.publisher},{book.pubdate}
                              </span>
                              <strong className="num_price">
                                ${book.price}
                              </strong>
                            </div>
                          </a>
                        </Link>
                      </Grid.Column>
                    ))}
                  </>
                )}
              </Grid.Row>
            </Grid>
            <Link href={`/explore`}>
              <Button>돌아가기</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          검색결과가 없습니다.
          <Link href={`/explore`}>
            <Button>돌아가기</Button>
          </Link>
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
