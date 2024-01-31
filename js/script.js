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
    optTitleListSelector = '.titles';

function generateTitleLinks() {
    console.log('Function \'generateTitleLinks\' is called');

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log('list titles:', titleList);

    clearElement(titleList);
    console.log('titleList is cleared:', titleList);

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('list of articles:', articles);

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