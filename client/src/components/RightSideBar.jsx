import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/chatContext'
import { AuthContext } from '../../context/AuthContext';

const RightSideBar = () => {

  const {selectedUser,messages} = useContext(ChatContext);
  const {logout, onlineUsers} = useContext(AuthContext);
  const [messageImages, setMessageImages] = useState([]);

  //get all images from messages and use them in state

  useEffect(()=>{
    setMessageImages(
      messages.filter(msg=>msg.image).map((msg=>msg.image))//filter returns the messages that have images and .map converts it to just images
    )
  },[messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 w-full p-5 relative overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>

      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
        <h1 className='{/*px-10*/} text-xl front-medium mx-auto flex items-center gap-2'>
          {onlineUsers.includes(selectedUser._id) &&<p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName} 
        </h1>
        <p className='{/*px-10*/} mx-auto'>{selectedUser.bio} </p>
      </div>
      <hr className='border-[#fffffff50] my-4' />
      <div className='px-5 text-xs '>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
          {messageImages.map((url,index)=>(
            <div key={index} onClick={()=>window.open(url, '_blank')} className='cursor-pointer rounded'> 
              <img src={url} alt="" className='h-full rounded-md' />
            </div>
          ))}
        </div>
      </div>

      {/* Logout  Button */}

      <button onClick={()=>logout()} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none px-20 py-2 rounded-full text-sm font-light cursor-pointer'>
        Logout
      </button>
    </div>
  )
}

export default RightSideBar