function expand(card) {
    card.classList.toggle('profile--expanded');
    if (!card.classList.contains('profile--expanded')) card.classList.toggle('profile--unexpanded');
    else if (card.classList.contains('profile--expanded') && card.classList.contains('profile--unexpanded')) card.classList.toggle('profile--unexpanded');
}






