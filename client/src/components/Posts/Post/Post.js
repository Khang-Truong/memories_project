import React from 'react';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/postsAction';
import useStyles from './PostStyles';

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	return (
		<Card className={classes.card}>
            {/* picture/ file media */}
			<CardMedia
				className={classes.media}
				image={
					post.selectedFile ||
					'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
				}
			/>

            {/* date and time of the post */}
			<div className={classes.overlay}>
				<Typography variant="h6">{post.creator}</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			
            {/* edit button */}
            <div className={classes.overlay2}>
				<Button
					style={{ color: 'white' }}
					size="small"
					onClick={() => setCurrentId(post._id)}
				>
					<MoreHorizIcon fontSize="default" />
				</Button>
			</div>
			
            
            <div className={classes.details}>
				<Typography variant="body2" color="textSecondary" component="h2">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			
            
            <CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.content}
				</Typography>
			</CardContent>
			
            {/* like and delete btn */}
            <CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(likePost(post._id))}
				>
					<ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{' '}
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => dispatch(deletePost(post._id))}
				>
					<DeleteIcon fontSize="small" /> Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default Post;
