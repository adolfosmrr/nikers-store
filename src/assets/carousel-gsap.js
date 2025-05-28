import { act } from 'react';
import { stories } from './data';
import { gsap } from 'gsap';

export function runCarouselAnimations() {
    let activeStory = 0;
    const storyDuration = 4000;
    const contentUpdateDelay = 0.4;
    let direction = 'next';
    let storyTimeout;

    const cursor = document.querySelector('.cursor');
    const cursorText = cursor.querySelector('p');

    function changeStory() {
        const previousStory = activeStory;
        if (direction === 'next') {
            activeStory = (activeStory + 1) % stories.length;
        } else {
            activeStory = (activeStory - 1 + stories.length) % stories.length;
        }

        const story = stories[activeStory];

        gsap.to('.profile-name p', {
            y: direction === 'next' ? -24 : 24,
            duration: 0.5,
            delay: contentUpdateDelay,
        });
        gsap.to('.title-row h1', {
            y: direction === 'next' ? -100 : 100,
            duration: 0.5,
            delay: contentUpdateDelay,
        })

        const currentImgContainer = document.querySelector('.story-img .img');
        const currentImg = currentImgContainer.querySelector('img');

        setTimeout(() => {
            const newProfileName = document.createElement('p');
            newProfileName.classList.add('text-soft-white', 'font-satoshiM', 'text-sm', 'absolute', 't-0')
            newProfileName.innerText = story.profileName;
            newProfileName.style.transform = direction === 'next' ? 'translateY(24px)' : 'translateY(-24px)';

            const profileNameDiv = document.querySelector('.profile-name');
            profileNameDiv.appendChild(newProfileName);

            gsap.to(newProfileName, {
                y: 0,
                duration: 0.5,
                delay: contentUpdateDelay,
            })

            const newShoesPicture = document.createElement('img');
            newShoesPicture.src = story.shoesImage;
            newShoesPicture.style.transform = direction === 'next' ? 'translateX(24px)' : 'translateX(-24px)';
            newShoesPicture.style.opacity = '0';

            const shoesPictureDiv = document.querySelector('.shoesDiv');
            shoesPictureDiv.appendChild(newShoesPicture);

            gsap.to(newShoesPicture, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                delay: contentUpdateDelay
            })

            const titleRows = document.querySelectorAll('.title-row');
            story.title.forEach((line, index) => {
                if (titleRows[index]) {
                    const newTitle = document.createElement('h1');
                    newTitle.classList.add(...story.titleClases[index])
                    newTitle.innerText = line;
                    newTitle.style.transform = direction === 'next' ? 'translateY(120px)' : 'translateY(-120px)';
                    titleRows[index].appendChild(newTitle);

                    gsap.to(newTitle, {
                        y: 0,
                        duration: 0.5,
                        delay: contentUpdateDelay,
                    })
                }
            })

            const newImgContainer = document.createElement('div');
            newImgContainer.classList.add('img', 'absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'overflow-hidden');
            const newStoryImg = document.createElement('img');
            newStoryImg.classList.add('absolute', 'top-0', 'left-0', 'size-full', 'object-cover', 'overflow-hidden')
            newStoryImg.src = story.storyBg;
            newStoryImg.alt = story.profileName;
            newImgContainer.appendChild(newStoryImg);

            const storyImgDiv = document.querySelector('.story-img');
            storyImgDiv.appendChild(newImgContainer);

            animateNewImage(newImgContainer);

            const upcomingImg = newStoryImg;
            animateImageScale(currentImg, upcomingImg);

            resetIndexHighligh(previousStory);
            animateIndexHighlight(activeStory);

            clearUpElements();

            clearTimeout(storyTimeout);
            storyTimeout = setTimeout(changeStory, storyDuration);
        }, 200);

        setTimeout(() => {
            const profileImg = document.querySelector('.profile-icon img');
            profileImg.src = story.profileImg;

            const link = document.querySelector('.link a');
            link.textContent = story.linkLabel;
            link.href = story.linkSrc;
        }, 600)
    }

    function animateNewImage(imgContainer) {
        gsap.set(imgContainer, {
            clipPath: direction === 'next' ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
        })

        gsap.to(imgContainer, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power4.inOut'
        })
    }

    function animateImageScale(currentImg, upcomingImg) {
        gsap.fromTo(currentImg, {
            scale: 1,
            rotate: 0,
        }, {
            scale: 2,
            rotate: direction === 'next' ? -25 : 25,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
                currentImg.parentElement.remove();
            }
        })

        gsap.fromTo(upcomingImg, {
            scale: 2,
            rotate: direction === 'next' ? 25 : -25,
        }, {
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: 'power4.inOut',
        })
    }

    function resetIndexHighligh(index) {
        const highlight = document.querySelectorAll('.index .index-highlight')[index];
        gsap.killTweensOf(highlight);
        gsap.to(highlight, {
            width: direction === 'next' ? '100%' : '0%',
            duration: 0.3,
            onStart: () => {
                gsap.to(highlight, {
                    transformOrigin: 'right center',
                    scaleX: 0,
                    duration: 0.3,
                })
            }
        })
    }

    function animateIndexHighlight(index) {
        const highlight = document.querySelectorAll('.index .index-highlight')[index];
        gsap.set(highlight, {
            width: '0%',
            scaleX: 1,
            transformOrigin: 'right center',
        })

        gsap.to(highlight, {
            width: '100%',
            duration: storyDuration / 1000,
            ease: 'none',
        })
    }

    function clearUpElements() {
        const profileNameDiv = document.querySelector('.profile-name');
        const newShoesPicture = document.querySelector('.shoesDiv');
        const titleRows = document.querySelectorAll('.title-row');
        const storyImg = document.querySelector('.story-img');

        while (profileNameDiv.childElementCount > 2) {
            profileNameDiv.removeChild(profileNameDiv.firstChild);
        }

        while (newShoesPicture.childElementCount > 1) {
            newShoesPicture.removeChild(newShoesPicture.firstChild)
        }

        while (storyImg.childElementCount > 3) {
            storyImg.removeChild(storyImg.firstChild)
        }

        titleRows.forEach((titleRow) => {
            while (titleRow.childElementCount > 2) {
                titleRow.removeChild(titleRow.firstChild);
            }
        })
    }

    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        gsap.to(cursor, {
            x: clientX - cursor.offsetWidth / 2,
            y: clientY - cursor.offsetHeight / 2,
            ease: 'power2.out',
            duration: 0.3,
        })

        const viewportWidth = window.innerWidth;
        if (clientX < viewportWidth / 2) {
            cursorText.textContent = 'Prev';
            direction = 'prev';
        } else {
            cursorText.textContent = 'Next';
            direction = 'next';
        }
    })

    document.addEventListener('click', () => {
        clearTimeout(storyTimeout);
        resetIndexHighligh(activeStory);
        changeStory();
    })

    storyTimeout = setTimeout(changeStory, storyDuration);
    animateIndexHighlight(activeStory);
}
