import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'


test('Renders initially titile and author, but not url and likes', () => {
    const blog = {
                       "user": "oi",
                       "likes": 1,
                       "author": "pete",
                       "title": "peten pizzat",
                       "url": "pzza.com",
                       "id" : "fkopkofopfkofpokoefwefewf"
    }

    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler}/>
    )

    expect(component.container).toHaveTextContent(
        'peten pizzat pete'
    )
    expect(component.container).not.toHaveTextContent('pzza.com')
})

test('Renders likes and url when show is pressed', () => {
    const blog = {
        "user": "oi",
        "likes": 1,
        "author": "pete",
        "title": "peten pizzat",
        "url": "pzza.com",
        "id" : "fkopkofopfkofpokoefwefewf"
}
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('pzza.com')
    expect(component.container).toHaveTextContent('1')

})

test('Like-event handler is called twice if like-button is pressed twice', () => {
    const blog = {
        "user": "oi",
        "likes": 1,
        "author": "pete",
        "title": "peten pizzat",
        "url": "pzza.com",
        "id" : "fkopkofopfkofpokoefwefewf"
}
    const likeMockHandler = jest.fn()
    const deleteMockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} handleLike={likeMockHandler} handleDelete={deleteMockHandler}/>
    )
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(likeMockHandler.mock.calls).toHaveLength(2)

})

test('correct information is passed from the create-blog-form', () => {
    const mockCreate = jest.fn()
    const component = render(
        <BlogForm handleCreation={mockCreate}/>
    )
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#formAuthor')
    const title = component.container.querySelector('#formTitle')
    const url = component.container.querySelector('#formUrl')

    fireEvent.change(author, { 
        target: { value: 'test-author' } 
      })
    fireEvent.change(title, { 
    target: { value: 'test-title' } 
    })
    fireEvent.change(url, { 
        target: { value: 'test-url' } 
      })

    fireEvent.submit(form)
    expect(mockCreate.mock.calls[0][0].author).toBe('test-author')
    expect(mockCreate.mock.calls[0][0].title).toBe('test-title')
    expect(mockCreate.mock.calls[0][0].url).toBe('test-url')

})
