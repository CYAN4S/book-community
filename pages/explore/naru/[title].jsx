import { Button, Divider, Header, List } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";

export default function Title({ books }) {
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
  } = books.items[0];

  const router = useRouter();
  function onClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <div className="wrap">
        <Segment>
          <div>
            <Image src={image} size="medium" centered />
          </div>
          <Header as="h3" style={{ paddingTop: 20 }} color="blue">
            책 정보
          </Header>
          <div className="info_book">
            <strong className="book_item"> {title} </strong>
            <strong className="num_price">
              {new Intl.NumberFormat("ko", {
                style: "currency",
                currency: "KRW",
              }).format(price)}
            </strong>

            <div className="txt_info">
              <List divided horizontal>
                <List.Item>
                  <strong>출판사</strong> {publisher}
                </List.Item>
                <List.Item>
                  <strong>출간일</strong> {pubdate}
                </List.Item>
                <List.Item>
                  <strong>작가</strong> {author}
                </List.Item>
              </List>
            </div>

            <Divider inverted />
            <Header as="h2" color="blue">
              Description
            </Header>
            <p style={{ paddingBottom: 20, fontSize: 15 }}>
              {decode(description)}
            </p>
            <Divider inverted />
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
            
          </div>
        </Segment>

        <Button onClick={onClick} style={{ marginTop: 10 }}>
          돌아가기
        </Button>
      </div>

      <style jsx>{`
        .wrap {
          text-align: center;
          margin: 30px 10px 20px 10px;
        }

        .book_item {
          display: block;
          font-size: 16px;
          margin-top: 25px;
        }

        .txt_info {
          display: block;
          font-size: 15px;
          color: red;
        }

        .book_item {
          display: block;
          font-size: 19px;
        }

        .num_price {
          display: block;
          font-size: 15px;
          margin-top: 10px;
          margin-bottom: 12px;
        }

        img {
          width: auto;
          height: 250px;
          transform: translateZ(0);
          backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
        }

        p {
          margin-bottom: 0.1em;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(props) {
  const title = props.query.title;
  const res = await fetch(
    "https://openapi.naver.com/v1/search/book.json?query=" + title,
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

  books.items.description = books.items.map((book) => {
    book.description = book.description.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  return {
    props: {
      books,
    },
  };
}