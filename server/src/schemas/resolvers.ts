import { GraphQLError } from "graphql";
import { User, Blog, Product } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import type IUserContext from "../interfaces/UserContext";
import type IUserDocument from "../interfaces/UserDocument";
import type IBlogInput from "../interfaces/BlogInput";
// import type IReviewDocument from "../interfaces/ReviewDocument";
// import type IProductDocument from "../interfaces/ProductDocument";
import type IProductInput from "../interfaces/ProductInput";

import dayjs from "dayjs";

const forbiddenException = new GraphQLError(
  "You are not authorized to perform this action.",
  {
    extensions: {
      code: "FORBIDDEN",
    },
  }
);

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("blogs");
        console.log(user);

        return user;
      }
      throw forbiddenException;
    },
    blogs: async () => {
      return Blog.find().sort({ dateCreated: -1 });
    },
    blog: async (_parent: any, { blogId }: { blogId: string }) => {
      return Blog.findById(blogId).populate("comments");
    },
  },

  Mutation: {
    addUser: async (
      _parent: any,
      args: any
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);

      return { token, user: user as IUserDocument };
    },

    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new GraphQLError("Incorrect credentials. Please try again.", {
          extensions: {
            code: "FORBIDDEN",
          },
        });
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user: user as IUserDocument };
    },

    addBlog: async (
      _parent: any,
      { blogData }: { blogData: IBlogInput },
      context: IUserContext
    ) => {
      if (context.user) {
        const blog = await Blog.create({
          ...blogData,
          username: context.user.username,
        });
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { blogs: blog._id } },
          { new: true }
        );

        return blog;
      }
      throw forbiddenException;
    },

    addComment: async (
      _parent: any,
      { blogId, comment }: { blogId: string; comment: string },
      context: IUserContext
    ) => {
      if (context.user) {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          { $push: { comments: { comment, username: context.user.username } } },
          { new: true }
        );
        return blog;
      }
      throw forbiddenException;
    },

    removeBlog: async (
      _parent: any,
      { blogId }: { blogId: string },
      context: IUserContext
    ) => {
      if (context.user) {
        const blog = await Blog.findByIdAndDelete(blogId);
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { blogs: blogId },
        });
        return blog;
      }
      throw forbiddenException;
    },

    editBlog: async (
      _parent: any,
      {
        blogId,
        title,
        content,
      }: { blogId: string; title: string; content: string },
      context: IUserContext
    ) => {
      if (context.user) {
        const blog = await Blog.findByIdAndUpdate(
          blogId,
          { title, content },
          { new: true }
        );
        return blog;
      }
      throw forbiddenException;
    },

    addProduct: async (
      _parent: any,
      { productData }: { productData: IProductInput },
      context: IUserContext
    ) => {
      if (context.user) {
        const product = await Product.create({
          ...productData,
          // username: context.user.username,
        });
        // const user = await User.findByIdAndUpdate(
        //   context.user._id,
        //   { $push: { products: product._id } },
        //   { new: true },
        // );

        return product;
      }
      throw forbiddenException;
    },

    addReview: async (
      _parent: any,
      {
        productId,
        review,
        rating,
      }: { productId: string; review: string; rating: number },
      context: IUserContext
    ) => {
      if (context.user) {
        const product = await Product.findByIdAndUpdate(
          productId,
          {
            $push: {
              reviews: {
                review,
                rating,
                username: context.user.username,
              },
            },
          },
          { new: true }
        );
        return product;
      }
      throw forbiddenException;
    },

    addBasketItem: async (
      _parent: any,
      { productId, quantity }: { productId: string; quantity: number },
      context: IUserContext
    ) => {
      if (context.user) {
        const product = await Product.findById(productId);
        if (!product) {
          throw new GraphQLError("Product not found.", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }

        const user = await User.findById(context.user._id);
        if (user) {
          // If the user already has the product in their basket, update the quantity
          for (const item of user.basket) {
            if (item.product.toString() === productId) {
              item.quantity += quantity;
              await user.save();
              return user;
            }
          }

          // Otherwise, add the product to the basket
          const basketItem = {
            product: productId,
            quantity,
          };
          await User.findByIdAndUpdate(
            context.user._id,
            { $push: { basket: basketItem } },
            { new: true }
          );
        }
        return user;
      }
      throw forbiddenException;
    },
  },
};

export default resolvers;
