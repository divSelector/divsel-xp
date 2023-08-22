export default function useMinimize(iconImage) {

    const minimizeWindow = (e) => {
        // Make Minimized Window Hidden
        const eventWindow = e.target.parentElement.parentElement.parentElement
        const titleBar = e.target.parentElement.parentElement.children[0]
        eventWindow.style.visibility = "hidden"

        // Create Minimized Tab
        const minTab = document.createElement('div');
        minTab.className = 'open-tab';
        minTab.setAttribute('data-window-id', eventWindow.id);
        const iconImg = document.createElement('img');
        iconImg.src = iconImage
        const textNode = document.createTextNode(titleBar.innerHTML);
        minTab.appendChild(iconImg);
        minTab.appendChild(textNode);

        // Add an onClick handler to the minimized tab
        minTab.onclick = () => {
            const correspondingWindow = document.getElementById(eventWindow.id);
            if (correspondingWindow) {
                correspondingWindow.style.visibility = "visible";
            }

            // Remove the minimized tab
            document.querySelector('.opened-tabs').removeChild(minTab);
        };

        // insert tab to taskbar
        const taskbarTabs = document.querySelector('.opened-tabs')
        taskbarTabs.appendChild(minTab)
    }

    return { minimizeWindow }

}