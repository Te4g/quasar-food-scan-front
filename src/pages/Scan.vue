<template>
  <q-page>
    <q-card v-if="scanned" class="my-card" flat bordered>
      <q-img
        :src="product.product.image_front_url"
        transition="fade"
        :ratio="1"
        contain
      >
       <template v-slot:error>
         <div class="absolute-full flex flex-center bg-negative text-white">
           Cannot load image
         </div>
       </template>
      </q-img>


      <q-card-section>
        <div class="text-overline text-orange-9">{{ product.product.brands }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ product.product.product_name }}</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Ajouter au repas" />
        <q-btn flat color="primary" label="Ajouter au stock" @click="addToStock" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            <q-list bordered separator>
              <q-item clickable v-ripple>
                <q-item-section>{{ product.product.nutriments.energy_100g }}</q-item-section>
                <q-item-label caption>Kcal/100g</q-item-label>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ product.product.quantity }}</q-item-label>
                  <q-item-label caption>Quantity package</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ product.product.nutriments.energy_100g * product.product.product_quantity / 100 }}</q-item-label>
                  <q-item-label caption>Kcal package</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ product.product.nutriments.sugars_100g }}</q-item-label>
                  <q-item-label caption>Sugar/100g</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>{{ product.product.nutriments.sodium_100g }}</q-item-label>
                  <q-item-label caption>Sodium/100g</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey">
        <q-tab icon="clear" name="clear" label="Clear" @click="clear"/>
        <q-tab icon="camera_enhance" name="scan" label="Scan"  @click="scan"/>
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'scanner',
  data() {
      return {
        detail: 'ajouter détails produit',
        expanded: false,
        product: '',
        url: 'https://world.openfoodfacts.org/api/v0/product/',
        scanned: false
      }
  },
  methods: {
    scanSuccessCallback (result) {
      this.$axios.get(`${this.url}${result.text}.json`).then(response => { this.product = response.data })
      this.scanned = true
    },
    scan () {
      cordova.plugins.barcodeScanner.scan(
        this.scanSuccessCallback,
        function (error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: "EAN_13", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: false, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    },
    clear () {
     this.scanned = false
    },
    addToStock () {
      this.$axios.post('https://192.168.0.21:8000/api/products', {
        code: this.product.product.code,
        isInStock: true,
        details: this.product
      })
    }
  }
}
</script>
