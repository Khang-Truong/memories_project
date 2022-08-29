import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	content: {  
		type: String,
		default: "",
	},
	userName: {  
		type: String,
		default: "",
	},
	tags: {  
		type: [String],
		default: [],
	},
	selectedFile: {  
		type: String,
		default: "",
	},
	likeCount: {  
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostsModel = mongoose.model('PostsModel', postSchema);
export default PostsModel;
