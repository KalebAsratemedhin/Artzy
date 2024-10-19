'use client'
import { Post } from '@prisma/client'
import React, { useState } from 'react'
import Modal from '../Shared/Modal'
import PostModalView from './PostModalView'

const PostCard = ({post}: {post: Post}) => {
    const url = post.picUrls[0].split('/uploads')[1]
    const [modalVisible, setModalVisible] = useState(false)

  return (
    
    <div>
      <div 
        className=" hover:opacity-95  rounded-lg h-72 w-72 hover:cur" 
        onClick={() => setModalVisible(true)}
        style={{ 
          backgroundImage: `url(${`http://localhost:3000/uploads/${encodeURIComponent(url)}`})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        
      </div>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
        <PostModalView post={post} />

      </Modal>

    </div>
    
  )
}

export default PostCard

