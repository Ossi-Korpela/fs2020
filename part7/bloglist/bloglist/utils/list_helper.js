const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total_likes = 0
    blogs.forEach(blog => {
        total_likes += blog.likes
    })
    return total_likes
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0){
        return {}
    }
    let best = blogs[0]
    blogs.forEach(blog => {
        if(blog.likes > best.likes){
            best = blog
        }
    })
    return({
        title: best.title,
        author: best.author,
        likes: best.likes
    })
}

const mostBlogs = (blogs) => {
    let blog_counts = []
    blogs.forEach(blog => {
        let author = blog.author
        blog_counts.push([author, blogs.filter(b => b.author === author).length])
    })

  
    let most_blogs = blog_counts[0][1]
    let most_author = blog_counts[0][0]

    blog_counts.forEach(blog => {
        if(blog[1] > most_blogs){
            most_blogs = blog[1]
            most_author = blog[0]
        }
    })
    
    
    return({blogs: most_blogs,
            author: most_author})

}


const mostLikes = (blogs) => {
    let like_counts = []
    blogs.forEach(blog => {
        let author = blog.author
        let like_count = 0
        blogs.forEach(blog => {
            if(blog.author === author){
                like_count += blog.likes
            }
        })
        like_counts.push([author, like_count])
    })

  
    let most_likes = like_counts[0][1]
    let most_author = like_counts[0][0]

    like_counts.forEach(blog => {
        if(blog[1] > most_likes){
            most_likes = blog[1]
            most_author = blog[0]
        }
    })
    
    
    return({author: most_author,
            likes: most_likes})

}


module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    dummy
}