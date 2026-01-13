import { model, models, Schema, Types,  } from "mongoose";

export interface Ivote{
 author:Types.ObjectId;
 actionId:Types.ObjectId;
 actionType:"question"|"answer";
 voteType:"upvote"|"downvote"
}
const VoteSchema =new Schema<Ivote>({
    author:{type:Schema.Types.ObjectId,ref:"User",required:true},
    actionId:{type:Schema.Types.ObjectId,required:true},
    actionType:{type:String,enum:["question","answer"],required:true},
    voteType:{type:String,enum:["upvote","downvote"],required:true}

},{
    timestamps:true
})

const Vote = models?.Vote || model<Ivote>("Vote",VoteSchema);

export default Vote