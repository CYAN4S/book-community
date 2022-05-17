import { Button, Grid, Icon, Table } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SearchKeyword({ books }) {
  const [lens, setLens] = useState(0);
  const [filter, setFilter] = useState(true);
  const [descDateFilter, setDescDateFilter] = useState(false);
  const [ascPriceFilter, setAscPriceFilter] = useState(false);
  const [descPriceFilter, setDescPriceFilter] = useState(false);

  useEffect(() => {
    setLens(books.items.length);
  }, []);

  const toggleFilter = () => {
    setDescDateFilter(false);
    setAscPriceFilter(false);
    setDescPriceFilter(false);
  };
  const toggleDescDateFilter = () => {
    setDescDateFilter(true);
    setAscPriceFilter(false);
    setDescPriceFilter(false);
  };

  const toggleAscPriceFilter = () => {
    setAscPriceFilter(true);
    setDescDateFilter(false);
    setDescPriceFilter(false);
  };

  const toggleDescPriceFilter = () => {
    setDescPriceFilter(true);
    setDescDateFilter(false);
    setAscPriceFilter(false);
  };

  const tempDescDate = [...books.items];
  tempDescDate.sort((a, b) => b.pubdate - a.pubdate);

  const tempAscPrice = [...books.items];
  tempAscPrice.sort((a, b) => a.price - b.price);

  const tempDescPrice = [...books.items];
  tempDescPrice.sort((a, b) => b.price - a.price);

  // 책 검색 결과를 CSS에 맞게 배치 
  return (
    <div>
      {lens ? (
        <>
          <div className="wrap">
            <div>
              <Button onClick={toggleDescDateFilter} inverted color="orange">
                최신 발간 순
              </Button>
              <Button onClick={toggleAscPriceFilter} inverted color="green">
                가격 낮은 순{" "}
              </Button>
              <Button onClick={toggleDescPriceFilter} inverted color="violet">
                가격 높은 순
              </Button>
              <Button onClick={toggleFilter} inverted color="red">
                정렬 해제
              </Button>
            </div>
            <div style={{ textAlign: "right" }}>
              <Link href={`/explore`}>
                <Button color="black">돌아가기</Button>
              </Link>
            </div>

            {filter ? (
              <>
                <Grid style={{ margin: 2 }} columns={4}>
                  <Grid.Row>
                    {descDateFilter && (
                      <>
                        {tempDescDate.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <div>
                              <div
                                style={{ marginBottom: 20 }}
                                className="ui two column grid ui center aligned segments"
                              >
                                <div className="columnImage">
                                  <div
                                    style={{ width: 110, height: 145 }}
                                    className="ui orange segment"
                                  >
                                    <Link href={`./detail/${book.title.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')}`}>
                                      <a>
                                        <img
                                          style={{
                                            width: 80,
                                            height: 120,
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
                                  style={{
                                    width: 300,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="ui yellow segment"
                                >
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          fontSize: 16,
                                        }}
                                      >
                                        <div>
                                          {book.title.length < 15
                                            ? book.title
                                            : book.title.slice(0, 15) + "..."}
                                        </div>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{ fontSize: 14 }}
                                      >
                                        출판일: {book.pubdate}
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
                            <div>
                              <div
                                style={{ marginBottom: 20 }}
                                className="ui two column grid ui center aligned segments"
                              >
                                <div className="columnImage">
                                  <div
                                    style={{ width: 110, height: 145 }}
                                    className="ui orange segment"
                                  >
                                    <Link href={`./detail/${book.title.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')}`}>
                                      <a>
                                        <img
                                          style={{
                                            width: 80,
                                            height: 120,
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
                                  style={{
                                    width: 300,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="ui yellow segment"
                                >
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          fontSize: 16,
                                        }}
                                      >
                                        <div>
                                          {book.title.length < 17
                                            ? book.title
                                            : book.title.slice(0, 15) + "..."}
                                        </div>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{ fontSize: 14 }}
                                      >
                                        출판일: {book.pubdate}
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
                    {descPriceFilter && (
                      <>
                        {tempDescPrice.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <div>
                              <div
                                style={{ marginBottom: 20 }}
                                className="ui two column grid ui center aligned segments"
                              >
                                <div className="columnImage">
                                  <div
                                    style={{ width: 110, height: 145 }}
                                    className="ui orange segment"
                                  >
                                    <Link href={`./detail/${book.title.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')}`}>
                                      <a>
                                        <img
                                          style={{
                                            width: 80,
                                            height: 120,
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
                                  style={{
                                    width: 300,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="ui yellow segment"
                                >
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          fontSize: 16,
                                        }}
                                      >
                                        <div>
                                          {book.title.length < 17
                                            ? book.title
                                            : book.title.slice(0, 15) + "..."}
                                        </div>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{ fontSize: 14 }}
                                      >
                                        출판일: {book.pubdate}
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
                    {!ascPriceFilter && !descDateFilter && !descPriceFilter && (
                      <>
                        {books.items.map((book) => (
                          <Grid.Column key={book.isbn}>
                            <div>
                              <div
                                style={{ marginBottom: 20 }}
                                className="ui two column grid ui center aligned segments"
                              >
                                <div className="columnImage">
                                  <div
                                    style={{ width: 110, height: 145 }}
                                    className="ui orange segment"
                                  >
                                    <Link href={`./detail/${book.title.replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')}`}>
                                      <a>
                                        <img
                                          style={{
                                            width: 80,
                                            height: 120,
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
                                  style={{
                                    width: 300,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="ui yellow segment"
                                >
                                  <Table.Header>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{
                                          fontSize: 16,
                                        }}
                                      >
                                        <div>
                                          {book.title.length < 17
                                            ? book.title
                                            : book.title.slice(0, 15) + "..."}
                                        </div>
                                      </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                      <Table.HeaderCell
                                        style={{ fontSize: 14 }}
                                      >
                                        출판일: {book.pubdate}
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
                  </Grid.Row>
                </Grid>
              </>
            ) : (
              <>
                <Grid style={{ margin: 2 }} columns={4}>
                  <Grid.Row>
                    {books.items.map((book) => (
                      <Grid.Column key={book.isbn}>
                        <div>
                          <div
                            style={{ marginBottom: 20 }}
                            className="ui two column grid ui center aligned segments"
                          >
                            <div className="columnImage">
                              <div
                                style={{ width: 110, height: 145 }}
                                className="ui orange segment"
                              >
                                <Link href={`./detail/${book.title}`}>
                                  <a>
                                    <img
                                      style={{
                                        width: 80,
                                        height: 120,
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
                              style={{
                                width: 300,
                                display: "flex",
                                justifyContent: "center",
                              }}
                              className="ui yellow segment"
                            >
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell
                                    style={{
                                      fontSize: 16,
                                    }}
                                  >
                                    <div>
                                      {book.title.length < 17
                                        ? book.title
                                        : book.title.slice(0, 15) + "..."}
                                    </div>
                                  </Table.HeaderCell>
                                </Table.Row>
                                <Table.Row>
                                  <Table.HeaderCell style={{ fontSize: 14 }}>
                                    출판일: {book.pubdate}
                                  </Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                            </div>
                          </div>
                        </div>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              padding: "200px 0",
              textAlign: "center",
              fontSize: "35px",
            }}
          >
            <Icon name="warning circle" color="red" />{" "}
            <strong>검색결과가 존재하지 않습니다.</strong>
            <p />
            <Link href={`/explore`}>
              <Button color="black">돌아가기</Button>
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
      "&display=100",
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
