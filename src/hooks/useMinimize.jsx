export default function useMinimize(iconImage) {
    
    const createMinimizedTab = (eventWindow, title) => {
        const minTab = document.createElement('div');
        minTab.className = 'open-tab';
        minTab.setAttribute('data-window-id', eventWindow.id);

        const iconImg = document.createElement('img');
        iconImg.src = iconImage;

        const textNode = document.createTextNode(title);
        minTab.appendChild(iconImg);
        minTab.appendChild(textNode);

        minTab.onclick = () => {
            eventWindow.style.visibility = "visible";
            document.querySelector('.opened-tabs').removeChild(minTab);
        };

        const taskbarTabs = document.querySelector('.opened-tabs');
        taskbarTabs.appendChild(minTab);
    }

    const minimizeWindow = (e) => {
        const eventWindow = e.target.parentElement.parentElement.parentElement;
        const titleBar = e.target.parentElement.parentElement.children[0];
        eventWindow.style.visibility = "hidden";
        createMinimizedTab(eventWindow, titleBar.innerHTML);
    }

    const minimizeExternalWindow = (selector, title) => {
        const eventWindow = document.querySelector(selector);
        eventWindow.style.visibility = "hidden";
        createMinimizedTab(eventWindow, title);
    }

    return { minimizeWindow, minimizeExternalWindow };
}
