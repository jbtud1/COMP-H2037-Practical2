document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('cast-container');
    const loadingMsg = document.getElementById('loading-msg');

    function createActorCard(actor) {
        const card = document.createElement('div');
        card.className = 'cast-card';
        const playerDisplay = actor.playerNumber ? `Player ${actor.playerNumber}` : 'Staff / Other';
        
        card.innerHTML = `
            <h3>${actor.name}</h3>
            <p class="role"><strong>Character:</strong> ${actor.characterName}</p>
            <p class="role-number"><strong>ID:</strong> ${playerDisplay}</p>
            <p class="bio">${actor.bio}</p>
        `;
        return card;
    }

    fetch('../actors.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (loadingMsg) loadingMsg.style.display = 'none';
            
            data.forEach(actor => {
                container.appendChild(createActorCard(actor));
            });
        })
        .catch(error => {
            console.error('Error fetching cast list:', error);
            if (loadingMsg) {
                loadingMsg.textContent = "Error loading data. Check console (F12). Ensure you are using a Local Server.";
                loadingMsg.style.color = "#d32f2f";
                loadingMsg.style.fontWeight = "bold";
            }
        });
});