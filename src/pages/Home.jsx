import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {Post} from '../components/Post';
import {TagsBlock} from '../components/TagsBlock';
import {CommentsBlock} from '../components/CommentsBlock';
import {fetchPosts, fetchTags} from '../redux/slice/PostsSlice'


export const Home = () => {
    const dispatch = useDispatch()
    const {posts, tags} = useSelector(state => state.posts)
    const userData = useSelector(state => state.auth.data)

    const isLoadingPosts = posts.status === 'loading'
    const isLoadingTags  = tags.status === 'loading'

    React.useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [dispatch])



    return (<>
        <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
            <Tab label="Новые"/>
            <Tab label="Популярные"/>
        </Tabs>
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {(isLoadingPosts ? [...Array(5)] : posts.items).map((item, index) => isLoadingPosts ? (
                        <Post key={index} isLoading={true}/>) :
                    (<Post
                        id={item._id}
                        title={item.title}
                        imageUrl={item.imageUrl ? `${process.env.REACT_APP_API_URL}${item.imageUrl}`: ''}
                        user='https://mui.com/static/images/avatar/1.jpg'
                        
                        createdAt={item.createdAt}
                        viewsCount={item.viewsCount}
                        commentsCount={3}
                        tags={['react', 'fun', 'typescript']}
                        isEditable={userData?._id ===item.user._id}

                    />))}
            </Grid>
            <Grid xs={4} item>
                <TagsBlock items={tags.items} isLoading={isLoadingTags}/>
                <CommentsBlock
                    items={[{
                        user: {
                            fullName: 'Вася Пупкин', avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        }, text: 'Это тестовый комментарий',
                    }, {
                        user: {
                            fullName: 'Иван Иванов', avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },]}
                    isLoading={false}
                />
            </Grid>
        </Grid>
    </>);
};
