(async function () {
  const apiBaseUrl = document.currentScript.dataset.apiBaseUrl;

  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/Home/GetFavIcon`);

    if (!response.ok) {
      return;
    }

    const favicon = await response.text();

    if (favicon) {
      document.getElementById("favicon").href = favicon;
    }
  } catch (error) {
    document.getElementById("favicon").href = "/favicon.ico";
    console.error("Failed to load tenant favicon", error);
  }
})();
