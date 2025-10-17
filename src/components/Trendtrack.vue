<template>
  <div class="promotion">
    <h2>Découvrez Trendtrack avec 10% de réduction !</h2>
    <p>Profitez de tous les avantages de Trendtrack et économisez 10% en utilisant notre lien d'affiliation.</p>
    <a href="https://trendtrack.io?fpr=mercuretheme" class="promo-link" target="_blank">Accédez à Trendtrack</a>
  </div>
</template>

<script>
export default {
  name: 'TrendtrackPromotion'
}
</script>

<style scoped>
.promotion {
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  background-color: #f9f9f9;
}
.promo-link {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  color: white;
  background-color: #4CAF50;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
.promo-link:hover {
  background-color: #45a049;
}
</style>
