import ChatFactory from "../../Components/ChatFactory";

export default function Collection({ collectionName }) {
  return (
    <div>
      <ChatFactory genre_chat={collectionName} />
    </div>
  );
}

export async function getServerSideProps(props) {
  const collectionName = props.query.collectionName;
  return {
    props: {
      collectionName: collectionName,
    },
  };
}
