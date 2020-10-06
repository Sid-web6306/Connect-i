console.log("heelo");
{
    //method to submit the form data for new post using AJAX
    let createPost = ()=>{
        let newPostForm = $('#new-post-form');

        newPostForm.submit((e)=>{
            e.preventDefault();


            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: (data)=>{
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error:(error)=>{
                    console.log('Error in sending a post mannually: ',error.responseText);
                }
            })
        })
    }

    //Method to create a post in DOM
    let newPostDom = (post)=>{
        return $(`
                <li  id="post-${post._id} ">
                <p style="font-weight: bolder;font-size: 18px; margin-right:10em;">

                        <small>
                            <a class="delete-post-button" style= "color:black; border:1px solid black;margin-right: 10px;;" href="/posts/destroy/<%= post._id %> ">X</a>
                        </small>
                    
                    ${post.content} 
                    <small style="padding: 0 4px; font-size: 9px;border-bottom: 1px solid black;">
                        ${post.user.name}
                    </small>
                </p>
                <div class="comments/post">
                    
                        <form action="/comments/create" id="comments-form" method="POST">
                            <input type="text" name="content" placeholder="Any Comments..." required/>
                            <input type="hidden" name="post" value="${ post._id }"/>
                            <input type="submit" value="Add Comments"/>
                        </form>
                    
                    <div class ="post-comments-list">
                        <div class="post-comments-<${post._id } ">
            
                            
                        </div>
                    </div>
                </div>
                
            </li>
        
        
        `)
    }

    //Method to delete a post
    

    createPost();
}