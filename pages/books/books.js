import { Grid } from "semantic-ui-react";

export default function Books({ books }) {
  const {
    title,
    image,
    author,
    price,
    discount,
    publisher,
    pubdate,
    isbn,
    description,
  } = books;

  return (
    <div>
      <div className="wrap">
        <Grid columns={4}>
          <Grid.Row>
            {books.items.map((book) => (
              <Grid.Column key={book.isbn}>
                <div>
                  <img
                    src={book.image}
                    alt="DON'T HAVE IMAGE"
                    className="img_book"
                  />
                  <strong className="book_item">
                    {book.title.replace(
                      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                      ""
                    )}
                  </strong>
                  <span className="txt_info">
                    {book.publisher},{book.pubdate}
                  </span>
                  <strong className="num_price">
                    {new Intl.NumberFormat("ko", {
                      style: "currency",
                      currency: "KRW",
                    }).format(book.price)}
                  </strong>
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
      <style jsx>{`

        // full layout
        .wrap {
          text-align: center;
          margin: 30px 10px 20px 10px;
        }

        // item placement
        .book_item {
          display: block;
          font-size: 16px;
          margin-top: 25px;
        }

        // text placement
        .txt_info {
          display: block;
          font-size: 13px;
          margin: 5px 0 15px;
        }

        .num_price {
          display: block;
          font-size: 16px;
          margin-top: 10px;
          margin-bottom: 25px;
          color: #000000;
        }

        .img_book {
          flex: 200px 0 0;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = async () => {
  // API ?????? : https://developers.naver.com/docs/search/book/
  const text = "react"; // test???
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

  return {
    props: {
      books: books,
    },
  };
};
