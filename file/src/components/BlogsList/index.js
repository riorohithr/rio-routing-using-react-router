import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const resource = await fetch('https://apis.ccbp.in/blogs')
    const data = await resource.json()
    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      topic: eachItem.topic,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
    }))
    this.setState({blogsData: updatedData, isLoading: true})
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="pink" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
