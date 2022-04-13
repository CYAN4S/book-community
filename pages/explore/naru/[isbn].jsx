import { Button, Divider, Header, List } from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";

export default function Title() {
  // const {
  //   title,
  // } = books.items[0];

  return (
    <>
      <div className="wrap">
        책
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
  const isbn = props.params.isbn.split(" ")[1];
  const res = await fetch(
    "http://data4library.kr/api/libSrchByBook?authKey=0358217be40b069fd831e0761da84765d8a072fa43055687cf94579e744060f9"+ "&isbn=" + isbn
  );

  console.log(res);
  // const books = await res.json();

  // books.items.title = books.items.map((book) => {
  //   book.title = book.title.replace(
  //     /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
  //     ""
  //   );
  // });

  // books.items.description = books.items.map((book) => {
  //   book.description = book.description.replace(
  //     /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
  //     ""
  //   );
  // });

  return {
    props: {
      // title,
    },
  };
}
