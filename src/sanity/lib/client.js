import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { sanityFetch } from './live'


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
export const getAllImages = async () => {
  const query = `*[_type == "galleryImage"]`
  const images = await sanityFetch({ query })
  return images.data
}

export const getImagesByProductCategory = async (productId) => {
  const query = `*[_type == "galleryImage" && category._ref == *[_type == "product" && _id == $productId][0].category._ref] {
    _id,
    image,
    title
  }`
  const result = await sanityFetch({ query: query, params: { productId } });
  return result.data || [];
}

export const getImagesByCategorySlug = async (slug) => {
  const query = `*[_type == "galleryImage" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)] {
    _id,
    image,
    title,
    category->
  }`
  const result = await sanityFetch({ query, params: { slug } });
  return result.data || [];
}

export const getAllProducts = async () => {
  const query = `*[_type == "product"] {
  ...,
  category->,
  }`
  const products = await sanityFetch({ query })
  return products.data
}

export const getAllCategories = async () => {
  const query = `*[_type == "productCategory"]`
  const categories = await sanityFetch({ query })
  return categories.data
}

export const getCategoryBySlug = async (slug) => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await sanityFetch({ query, params: { slug } })
  return category.data
}

export const getProductsByCategorySlug = async (slug) => {
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]`
  const products = await sanityFetch({ query: query, params: { slug } });
  return products.data
}

export const getProductById = async (id) => {
  const query = `*[_type == "product" && _id == $id][0]`;
  const product = await sanityFetch({ query: query, params: { id } });
  return product.data
}
