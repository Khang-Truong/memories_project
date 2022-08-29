import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './FormStyles';
import { createPost, updatePost } from '../../actions/postsAction';

const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [postData, setPostData] = useState({
		content: '',
		userName: '',
		tags: '',
		selectedFile: '',
	});

	//retrieve the post to edit
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const clear = () => {
		setCurrentId(0);
		setPostData({
			content: '',
			userName: '',
			tags: '',
			selectedFile: '',
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currentId === 0) {
			dispatch(createPost(postData));
		} else {
			dispatch(updatePost(currentId, postData));
		}
		clear();
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? 'Editing ': 'Creating a Memory'}{' '}
					{/* change the title from create to edit */}
				</Typography>
				<TextField
					name="content"
					variant="outlined"
					label="Content"
					fullWidth
					multiline
					rows={4}
					value={postData.content}
					onChange={(e) =>
						setPostData({ ...postData, content: e.target.value })
					}
				/>
				<TextField
					name="userName"
					variant="outlined"
					label="UserName"
					fullWidth
					value={postData.userName}
					onChange={(e) =>
						setPostData({ ...postData, userName: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags (coma separated)"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
