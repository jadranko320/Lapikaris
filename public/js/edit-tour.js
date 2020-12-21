if (screen.width <= 1080) {
  const textAreas = [];
  for (let i = 1; i <= 4; i++)
    if (document.getElementById(`attraction-${i}-text`))
      textAreas.push(document.getElementById(`attraction-${i}-text`));

  for (let i = 0; i < textAreas.length; i++) textAreas[i].cols = "28";
}