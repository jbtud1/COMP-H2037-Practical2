document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cast-container');
    
    // Function to create a card element
    function createCard(actor) {
        const card = document.createElement('div');
        card.className = 'cast-card';
        
        const playerNum = actor.playerNumber ? `Player ${actor.playerNumber}` : 'Staff / Other';
        
        card.innerHTML = `
            <h3>${actor.name}</h3>
            <p class="role"><strong>Role:</strong> ${actor.characterName} (${playerNum})</p>
            <p class="bio">${actor.bio}</p>
        `;
        
        return card;
    }

    // Fetch data from JSON
    fetch('actors.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear loading message
            container.innerHTML = '';
            
            // Loop through data and append cards
            data.forEach(actor => {
                const card = createCard(actor);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching cast data:', error);
            container.innerHTML = `<p class="error-message">Unable to load cast list at this time. Please try refreshing the page.</p>`;
        });
});