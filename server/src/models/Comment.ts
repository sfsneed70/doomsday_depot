import { Schema, type Document } from "mongoose";
import dayjs from "dayjs";

export interface IComment extends Document {
  username: string;
  comment: string;
  dateCreated: Date | string;
}

const commentSchema = new Schema<IComment>(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date): string =>
        dayjs(timestamp).format("MMM DD, YYYY [at] hh:mm A"),
    },
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

export default commentSchema;

/*
This is a subdocument schema that "lives" on the Blog. This is a very simple approach to comments becasuse all the
comments will iimmediately populate on the blog when the blog is queried. These are the tradeoffs of this approach:

Advantages:
1. Simplified Data Model:
All comments are embedded directly in the blog document, reducing the need for managing a separate comments collection and maintaining relationships between blogs and comments.
2. Optimized Reads:
Retrieving a blog along with its comments is faster and more efficient since all the data is in a single document. This is especially beneficial for read-heavy applications where most users view blog posts with comments.
3. Atomic Updates:
MongoDB ensures that updates to a document (including its subdocuments) are atomic. This makes it easier to add, update, or delete comments without worrying about consistency issues between separate collections.
4. No Need for Joins:
By embedding comments directly in the blog document, you avoid the overhead of performing joins or lookups between the blog and a separate comments collection.
5. Logical Grouping:
Comments are tightly coupled with the blog, so embedding reflects this natural hierarchy. This makes it easier to reason about the relationship in your code.

Disadvantages:
1. Document Size Limitations:
MongoDB has a 16 MB document size limit, which can become problematic if a blog accumulates a large number of comments. This approach is not suitable for blogs that might receive hundreds or thousands of comments.
2. Limited Querying Capabilities:
Querying or searching for specific comments (e.g., all comments by a particular user) is more difficult and less efficient when comments are embedded. You'd have to query the parent blog and then filter the comments in your application logic.
3. Write Performance Degradation:
Every time a comment is added, the entire blog document must be rewritten to disk, which can impact performance as the number of comments grows.
4. Difficulty in Deleting/Archiving Old Comments:
If you need to delete or archive older comments (e.g., for data retention policies), it requires modifying the entire blog document, which can be inefficient and error-prone.
5. Concurrency Issues:
In write-heavy scenarios, where multiple users might add comments to the same blog simultaneously, concurrent writes to the same document can lead to contention and performance bottlenecks.
6. Data Duplication in Related Features:
If comments are needed in other contexts (e.g., displaying all comments by a user), you might need to duplicate data or maintain additional indexes, increasing complexity.


*/
