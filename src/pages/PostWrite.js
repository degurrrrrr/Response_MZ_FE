import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Grid, Image, Text, Input } from "../element/index";
import { api_post } from "../shared/api";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  
  const { history } = props;

  const user_id = useSelector((state) => state.user_id);
  const post_id = props.match.params.id;
  const post = useSelector((state) => state.post.post);
  const post_list = useSelector((state) => state.post.list);

  const is_login = useSelector((state) => state.user.is_login);

  const _post_id = props.match.params.post_id;
  const is_edit = _post_id ? true : false;
  let _post = is_edit ? post_list.find((p) => p.id === _post_id) : null;

  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState();
  const [content, setContent] = React.useState(_post ? _post.content : "");

  const img_url = useSelector((state) => state.post.img_url);
  const [fileImage, setFileImage] = React.useState(
   img_url !== '' && is_edit
      ? img_url
      : 'https://w7.pngwing.com/pngs/767/518/png-transparent-color-vantablack-light-graphy-white-paper-blue-white-text-thumbnail.png'
  );

  const saveFileImage = (e) => {
    const img = e.target.files[0];
    console.log(img)
    const formData = new FormData();
    formData.append('image', img);
    console.log(formData); // FormData {}
    for (const keyValue of formData) console.log(keyValue);
    dispatch(postActions.imageAPI(formData));

    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  const changeImage = (e) => {
    setFileImage(e.target.value)
  }
  React.useEffect(() => {
    api_post.get('/articles',{}
      ).then(function (res) {
      setFileImage(res.data.post.img_url);
    })}, []);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const is_checked = (e) => {
    if (e.target.checked) {
      setYear(e.target.value);
    }
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(img_url, title, year, content));
    console.log(img_url, title, year, content)
  }

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, img_url, title, year, content));
    console.log("edit dispatch ??????")

  };

  if (!is_login) {
    return (
      <Grid margin="200px" padding="16px" center>
        <Text size="30px" bold>
          ?????????????
        </Text>
        <Text size="24px">????????? ????????? ??? ????????? ???????????????!</Text>
        <Button
          _onclick={() => {
            history.replace("/login");
          }}
          text="????????? ????????????"
        ></Button>
      </Grid>
    );
  }

  return (
    <>
      <Text margin="100px" size="36px" bold>
        {is_edit ? '????????? ??????' : '????????? ??????'}
      </Text>
      <Grid padding="100px auto" width="700" height="500">
        <Grid is_flex borderRadius="10">
          <Image
            width="350"
            height="400"
            _onChange={changeImage}
            src={
              img_url
              ? img_url
              : ''}
            margin="20px 5px"
          />
          <Grid height="300">
            <Input type="file" _onChange={saveFileImage}/>
            <Text text="?????????"></Text>{" "}
            <Input type="text" _onChange={changeTitle} />
            <Text
              bold
              // margin="0px 0px 10px 0px"
              padding="0px 0px 10px"
              textAlign="left"
              bg="#59c1c2"
              text="????????? ??????"
            />
            <Grid display="inline-box" alignItems="center">
              <input
                type="radio"
                name="year"
                value="1980"
                id="1980"
                onChange={is_checked}
              />
              80?????? ??????
              <input
                type="radio"
                name="year"
                value="1990"
                id="1990"
                onChange={is_checked}
              />{" "}
              90?????? ??????
              <input
                type="radio"
                name="year"
                value="2000"
                id="2000"
                onChange={is_checked}
              />{" "}
              2000?????? ?????? ??????
            </Grid>
            <Grid>
              <Text
                bold
                paddingTop="30px"
                bg="#59c1c2"
                textAlign="left"
                text="????????? ??????"
              />
              <Input _onChange={changeContent} />
            </Grid>
          </Grid>
        </Grid>
        <Grid is_flex>
          <Button
            width="120px"
            height="50px"
            color="white"
            bg="#f47b6a"
            text="????????????"
            _onclick={() => history.push("/")}
          ></Button>
          <Grid padding="25px">
            {is_edit ? (
              <Button
              text="????????????"             
              width="120px"
              height="50px"
              color="white"
              bg="#f47b6a"
              _onclick={editPost}
              />
            ) : (
              <Button
              text="????????? ??????"             
              width="120px"
              height="50px"
              color="white"
              bg="#f47b6a"
              _onclick={() => {addPost()}}/>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PostWrite;
