import { useRouter } from "next/router";
import { Button, Grid, Table } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchKeyword({ books }) {
  const router = useRouter();
  const [lens, setLens] = useState(0);
  const [filter, setFilter] = useState(false);
  const [descDateFilter, setDescDateFilter] = useState(false);
  const [ascPriceFilter, setAscPriceFilter] = useState(false);
  const [descPriceFilter, setDescPriceFilter] = useState(false);

  useEffect(() => {
    setLens(books.items.length);
  }, []);

  const toggleFilter = () => {
    setFilter((prev) => !prev);
  };

  const toggleDescDateFilter = () => {
    setDescDateFilter((prev) => !prev);
    setAscPriceFilter(false);
    setDescPriceFilter(false);
  };

  const toggleAscPriceFilter = () => {
    setAscPriceFilter((prev) => !prev);
    setDescDateFilter(false);
    setDescPriceFilter(false);
  };

  const toggleDescPriceFilter = () => {
    setDescPriceFilter((prev) => !prev);
    setDescDateFilter(false);
    setAscPriceFilter(false);
  };

  const tempDescDate = [...books.items];
  tempDescDate.sort((a, b) => b.pubdate - a.pubdate);

  const tempAscPrice = [...books.items];
  tempAscPrice.sort((a, b) => a.price - b.price);

  const tempDescPrice = [...books.items];
  tempDescPrice.sort((a, b) => b.price - a.price);
  // 최신 발간 순 및 가격 높은 순
  // const tempDateAndPrice = [...books.items];
  // tempDateAndPrice.sort((a,b) => {
  //   if (a.pubdate < b.pubdate) return 1;
  //   else if (a.pubdate > b.pubdate) return -1;
  //   else if (a.price < b.price) return 1;
  //   else if (a.price > b.price) return -1;
  //   console.log("작동")
  // });
  const maxlimit = 10;
  return (
    <div>
      {lens ? (
        <>
          <div className="wrap">
            {!filter && (
              <>
                <div class="ui segment">
                  <button
                    class="fluid ui button ui green button"
                    onClick={toggleFilter}
                  >
                    정렬 필터
                  </button>
                </div>
              </>
            )}

            {filter ? (
              <>
                <div class="ui black segment">
                  <button
                    class="ui left floated teal button"
                    onClick={toggleDescDateFilter}
                  >
                    최신 발간 순
                  </button>
                  <button class="ui blue button" onClick={toggleAscPriceFilter}>
                    가격 낮은 순{" "}
                  </button>
                  <button
                    class="ui violet button"
                    onClick={toggleDescPriceFilter}
                  >
                    가격 높은 순
                  </button>
                </div>
                <Grid style={{}} columns={3}>
                  <Grid.Row>
                    {descDateFilter && (
                      <>
                        {tempDescDate.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <div style={{}}>
                              <div class="ui two column grid ui center aligned  segments">
                                <div class="columnImage">
                                  <div style={{}} class="ui orange segment">
                                    <Link href={`./detail/${book.title}`}>
                                      <a>
                                        <img
                                          style={{
                                            width: 80,
                                          }}
                                          src={book.image}
                                          alt="DON'T HAVE IMAGE"
                                          className="img_book"
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                                <div
                                  style={{ width: 300, height: 110 }}
                                  class="ui yellow segment"
                                >
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          fontSize: 16,
                                        }}
                                      >
                                        <div>
                                          {book.title.length < 17 ? book.title : book.title.slice(0,18) + '...'}
                                        </div>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          width: 300,
                                        }}
                                      >
                                        <p>({book.publisher})</p>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                      //style={{ width: 300 }}
                                      >
                                        출판일: {book.pubdate}
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell style={{ width: 300 }}>
                                        가격: {book.price}원
                                      </Table.HeaderCell>
                                    </Table.Row>
                                  </Table.Header>
                                </div>
                              </div>
                            </div>
                          </Grid.Column>
                        ))}
                      </>
                    )}
                    {ascPriceFilter && (
                      <>
                        {tempAscPrice.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <Link href={`./detail/${book.title}`}>
                              <a>
                                <div class="ui segment">
                                  <div class="ui two column grid">
                                    <div class="column">
                                      <div class="ui internally celled">
                                        <img
                                          style={{ width: 80 }}
                                          src={book.image}
                                          alt="DON'T HAVE IMAGE"
                                          className="img_book"
                                        />
                                      </div>
                                    </div>
                                    <div class="column">
                                      <Table.Header>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="book_item">
                                              제목:
                                            </strong>
                                            {truncateTitle}
                                          </Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_publisher">
                                              출판사: {book.publisher}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_pubdate">
                                              출판일자: {book.pubdate}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="num_price">
                                              가격: {book.price}원
                                            </strong>
                                          </Table.HeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </Grid.Column>
                        ))}
                      </>
                    )}
                    {descPriceFilter && (
                      <>
                        {tempDescPrice.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <Link href={`./detail/${book.title}`}>
                              <a>
                                <div class="ui segment">
                                  <div class="ui two column grid">
                                    <div class="column">
                                      <div class="ui internally celled">
                                        <img
                                          style={{ width: 80 }}
                                          src={book.image}
                                          alt="DON'T HAVE IMAGE"
                                          className="img_book"
                                        />
                                      </div>
                                    </div>
                                    <div class="column">
                                      <Table.Header>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="book_item">
                                              제목:
                                            </strong>
                                            {book.title}
                                          </Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_publisher">
                                              출판사: {book.publisher}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_pubdate">
                                              출판일자: {book.pubdate}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="num_price">
                                              가격: {book.price}원
                                            </strong>
                                          </Table.HeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </Grid.Column>
                        ))}
                      </>
                    )}
                    {!ascPriceFilter && !descDateFilter && !descPriceFilter && (
                      <>
                        {books.items.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <Link href={`./detail/${book.title}`}>
                              <a>
                                <div class="ui segment">
                                  <div class="ui two column grid">
                                    <div class="column">
                                      <div class="ui internally celled">
                                        <img
                                          style={{ width: 80 }}
                                          src={book.image}
                                          alt="DON'T HAVE IMAGE"
                                          className="img_book"
                                        />
                                      </div>
                                    </div>
                                    <div class="column">
                                      <Table.Header>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="book_item">
                                              제목:
                                            </strong>
                                          </Table.HeaderCell>
                                        </Table.Row>
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_publisher">
                                              출판사: {book.publisher}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <span className="txt_info_pubdate">
                                              출판일자: {book.pubdate}
                                            </span>
                                          </Table.HeaderCell>
                                        </Table.Row>{" "}
                                        <Table.Row>
                                          <Table.HeaderCell
                                            style={{ width: 300 }}
                                          >
                                            <strong className="num_price">
                                              가격: {book.price}원
                                            </strong>
                                          </Table.HeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </Grid.Column>
                        ))}
                      </>
                    )}
                  </Grid.Row>
                </Grid>
              </>
            ) : (
              <>
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
                  </Grid.Row>
                </Grid>
              </>
            )}

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
