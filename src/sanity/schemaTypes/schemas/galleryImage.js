import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
    name: "galleryImage",
    title: "Gallery Image",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),

        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "productCategory" }],
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
        }),

    ]
})