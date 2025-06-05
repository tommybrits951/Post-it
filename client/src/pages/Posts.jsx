import { useEffect, useContext, useState } from "react";
import PostContext from "../context/PostContext";
import { useParams } from "react-router";
import axios from "../api/axios";
import PostForm from "../components/post/PostForm";
import PostList from "../components/post/PostList";

const initForm = {
  txt: "",
  img: null,
};

export default function Posts() {
  const { auth, user } = useContext(PostContext);
  const { board_id } = useParams("");
  const [formData, setFormData] = useState(initForm);
  const [posts, setPosts] = useState([]);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (auth) {
      axios
        .get(`/post/${board_id}`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    if (auth) {
      axios
        .get(`/board/${board_id}`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    const pkg = new FormData();
    pkg.append("author_id", user.user_id)
    pkg.append("board_id", board_id);
    if (formData.txt !== "") {
        pkg.append("txt", formData.txt)
    }
    if (formData.img !== null) {
        pkg.append("img", formData.img)
    } else {
        pkg.append("img", null)
    }

    axios
      .post(`/post`, pkg, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  function changeImg(e) {
    const img = e.target.files[0];
    setFormData({ ...formData, img: img });
  }
  function change(e) {
    setFormData({...formData, txt: e.target.value})
  }
  return (
    <div>
      <h2 className="absolute border-4 border-white p-3 top-15 left-1/5 text-4xl text-stone-300 font-mono font-bold">
        "{board ? board.subject : null}"
      </h2>
      <div>
        <PostList posts={posts} />
      </div>
      <footer className="fixed w-10/12 left-1/12 bottom-4">
        <PostForm
          submit={submit}
          formData={formData}
          changeImg={changeImg}
          change={change}
        />
      </footer>
    </div>
  );
}
