import React from 'react'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateBlogForm from '../src/components/CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm/> calls eventhandler on submit and receive right params',async ()=>{
 const createBlog = jest.fn()
 const user = userEvent.setup()

render(<CreateBlogForm createBlog={createBlog}/>)
    const inputTitle = screen.getByPlaceholderText('write blog title here')
    const inputUrl = screen.getByPlaceholderText('write blog url here')
    const inputAuthor = screen.getByPlaceholderText('write blog author here')
    const submitButton = screen.getByText('Submit')



    await userEvent.type(inputTitle,'testing title')
    await userEvent.type(inputAuthor,'testing author')
    await userEvent.type(inputUrl,'testing url')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing url')
   
})