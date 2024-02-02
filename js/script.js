'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);


    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefValue = clickedElement.getAttribute('href');
    console.log('Clicked link href:', hrefValue);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(hrefValue);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('active Article:', targetArticle);
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
    console.log('Function \'generateTitleLinks\'' + customSelector + '  is called');

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('list titles:', titleList);

    clearElement(titleList);
    console.log('titleList is cleared:', titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('list of articles:', articles);
    console.log('customSelector:', customSelector);
    console.log('optArticleSelector + customSelector:', optArticleSelector + customSelector);

    let html = '';

    /* get the article id */
    for (let article of articles) {

        let articleId = article.getAttribute('id');
        console.log('articleId: ', articleId);

        /* find the title element */
        let articleTitleElement = article.querySelector(optTitleSelector);

        /* get the title from the title element */
        let articleTitle = articleTitleElement.innerHTML;
        console.log('articleTitle: ', articleTitle);

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log('linkHTML: ', linkHTML);

        /* insert link into html variable */
        html = html + linkHTML;
        console.log('linkHTML  with variable: ', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links are: ' + links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function clearElement(element) {
    element.innerHTML = '';
}

function generateTags() {
    console.log('Function \'generateTags\' is called');
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('all articles', articles);


    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        console.log('tagsWrapper', tagsWrapper);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        let tags = article.getAttribute('data-tags');
        console.log('tags', tags);

        /* split tags into array */
        const tagNames = tags.split(' ');
        console.log('tagNames: ', tagNames);

        /* START LOOP: for each tag */
        for (let tag of tagNames) {
            console.log('tag: ', tag);

            /* generate HTML of the link */
            const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
            console.log(linkHTML);

            /* add generated code to html variable */
            html += linkHTML;
            console.log('added new link', html);
            /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        console.log('structure of ul links', tagsWrapper);
        /* END LOOP: for every article: */
    }
}

generateTags();


function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTags', activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');

        /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('tagLinks equal to the href of clickedElement', tagLinks);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

        /* add class active */
        tagLink.classList.add('active');
        console.log('class active added to tagLink', tagLink);

        /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as an argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    console.log('allLinksToTags', allLinksToTags);

    /* START LOOP: for each link */
    for (let link of allLinksToTags) {
        /* add tagClickHandler as an event listener for that link */
        link.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

function generateAuthors() {
    console.log('Function \'generateAuthors\' is called');
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('all articles', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {
        /* find author wrapper */
        const authorsWrapper = article.querySelector(optArticleAuthorSelector);
        console.log('authorsWrapper', authorsWrapper);

        /* make html variable with empty string */
        let html = '';

        /* get author from data-author attribute */
        let author = article.getAttribute('data-author');
        console.log('author', author);

        /* generate HTML of the link */
        const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
        console.log(linkHTML);


        /* add generated code to html variable */
        html += linkHTML;
        console.log('added new link', html);
        /* insert HTML of all the links into the tags wrapper */
        authorsWrapper.innerHTML = html;
        console.log('structure of links', authorsWrapper);
    }
}

generateAuthors();

function addClickListenersToAuthors() {
    /* find all links to tags */
    const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
    console.log('allLinksToAuthors', allLinksToAuthors);

    /* START LOOP: for each link */
    for (let author of allLinksToAuthors) {
        /* add tagClickHandler as an event listener for that link */
        author.addEventListener('click', authorClickHandler);
        /* END LOOP: for each link */
    }
}

function authorClickHandler(event) {
    console.log('Function \'authorClickHandler\' is called');
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement', clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author', author);

    /* find all tag links with class active */
    const activeAuthor = document.querySelector('a.active[href^="#author-"]');
    console.log('activeAuthor', activeAuthor);
    if (activeAuthor != null) {
        /* remove class active */
        activeAuthor.classList.remove('active');
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('authorLink equal to the href of clickedElement', authorLinks);

    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {

        /* add class active */
        authorLink.classList.add('active');
        console.log('class active added to authorLink', authorLink);

        /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with author selector as an argument */
    generateTitleLinks('[data-author="' + author + '"]');

}

addClickListenersToAuthors();
