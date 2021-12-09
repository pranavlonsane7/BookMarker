//Listen for form submit
document.getElementById('MyForm').addEventListener('submit', saveBookMark);

//save bookmark
function saveBookMark(e)
{
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL))
    {
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteURL

    }

   // console.log(bookmark);

   /*
   //Local Storage Test
   localStorage.setItem('test', 'Online-Test');
   console.log(localStorage.getItem('test'));
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));*/
   
   //Test if bookmarks is null
   if(localStorage.getItem('bookmarks') === null)
   {
       //init array
       var bookmarks = [];
       //Add to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        console.log(localStorage.getItem('bookmarks'));
   }
   else{
       //Get bookmarks from localStorage
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       //add bookmark to array
       bookmarks.push(bookmark);
       //Reset it back to localStorage
       localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   }
    //Refetch the bookmark
    fetchBookmarks();

    //Clear form
    document.getElementById('MyForm').reset();

    e.preventDefault(); //prevent form from submitting
}

//delete bookmarks
function deleteBookmark(url)
{
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks and check 
    for(var i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url == url)
        {
            //Remove from array
            bookmarks.splice(i,1);
        }
    }
    //Reset it back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //Refetch the bookmark
    fetchBookmarks();

}
//Fetch Bookmarks
function fetchBookmarks()
{
     //Get bookmarks from localStorage
     var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    //Build output
    bookmarksResults.innerHTML= '';

    for(var i=0;i<bookmarks.length; i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+'<h3>'+name+ '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
        '<a  onclick="deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a>'
        '</h3>'+'</div>';
    }
}

function validateForm(siteName, siteURL)
{
    if(!siteName || !siteURL)
    {
        alert('Please fill in all the fields');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex))
    {   
        alert('Please enter a valid URL');
        return false;
    }

    return true;
}