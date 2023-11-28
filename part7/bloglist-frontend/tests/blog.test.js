import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'


describe('Testing component <Blog />', () => {

  let blogTest = {
    url: 'www.google.com',
    author: 'Luthor',
    title: 'Denim',
    id: 1,
    likes: 25,
    user: 'anton',
  }

  let canBeDeleted 
  let mockHandlerDelete 
  let mockHandlerLike 
  let container

  beforeEach(() => {
    canBeDeleted = true
    mockHandlerDelete = jest.fn()
    mockHandlerLike = jest.fn()
    container = render(<Blog data={blogTest} canBeDeleted={canBeDeleted} handleDelete={mockHandlerDelete} handleLike={mockHandlerLike} />).container
  })



  test('Blog display author and title, but not like and url by default', () => {
    screen.getByText('Denim by Luthor', { exact: false })
    const div = container.querySelector('.blog-details')
    expect(div).toHaveStyle('display: none')

  })

  test('Blog display url and likes after button show details clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')

    screen.getByText(`Likes : ${blogTest.likes}`, { exact: false })
    screen.getByText(`Url : ${blogTest.url}`, { exact: false })
  })

  test('like button clicked twice,event handler called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })


})



