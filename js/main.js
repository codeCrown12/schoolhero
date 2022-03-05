var app = new Vue({
    el: "#app",
    data:{
        lessons: lessons,
        cart_items: [],
        order_details:{
            firstname: "",
            lastname: "",
            mobile: "", 
        },
        search_keyword: "",
        sort_order: "ascending",
        attribute_sort: "title"
    },
    methods: {
        // Logic to add class activity to cart
        addToCart: function(lesson){
            if (lesson.spaces >= 1) {
                // Update the DOM
                lesson.spaces -= 1
                //Add item to cart array
                this.cart_items.push(lesson.id)
            }
            else{
                lesson.spaces = 0
            }
        },
        // Method to count items in the cart
        countCart: function(){
            return this.cart_items.length
        },
        // Method to return information about the items in the cart
        cartItemsInfo: function(){
            let cart_items_modified = []
            for (let i = 0; i < this.cart_items.length; i++) {
                for (let j = 0; j < this.lessons.length; j++) {
                    if (this.lessons[j].id == this.cart_items[i]) {
                        cart_items_modified.push(this.lessons[j])
                    }   
                }
            }
            return cart_items_modified
        },
        // Logic to disable add to cart button if number of spaces reaches zero
        disableAddToCart: function(lesson){
            if (lesson.spaces >= 1){
                return false
            }
            return true
        },
        // Logic to disable art button if no items in the cart
        hideCart: function(){
            if (this.countCart() >= 1) {
                return false
            }
            return true
        },
        // Remove items from cart
        removeFromCart: function(id){
            for (let i = 0; i < this.lessons.length; i++) {
                if (this.lessons[i].id == id) {
                    // add the space back to the stock
                    this.lessons[i].spaces += 1
                    // Find index of item in the cart array
                    let item_index = this.cart_items.indexOf(id)
                    //remove item from the cart array
                    this.cart_items.splice(item_index, 1)     
                }
            }
        },
        // Get total price of items in the cart
        totalPrice: function(){
            let sum = 0
            for (let i = 0; i < this.cart_items.length; i++) {
                for (let j = 0; j < this.lessons.length; j++) {
                    if (this.lessons[j].id == this.cart_items[i]) {
                        sum += this.lessons[j].price
                    }   
                }
            }
            return sum
        },
        // Validate name and phone number check out fields
        validateFields: function(){
            if (/^[0-9]+$/.test(this.order_details.mobile) && /^[a-z]+$/i.test(this.order_details.firstname) && /^[a-z]+$/i.test(this.order_details.lastname)){
                return false
            }
            return true
        },
        // Checkout logic
        checkOut: function(){
            //Empty cart
            this.cart_items = []

            // Clear check out form fields
            this.order_details.firstname = ""
            this.order_details.lastname = ""
            this.order_details.mobile = ""
            
            //Display message
            Swal.fire(
                'Success!',
                'Order submitted successfully!',
                'success'
            )
        },
        //Logic to filter results based on search keyword
        filteredList: function(){
            let newList = this.lessons.filter((lesson) => {
                return lesson.title.toLowerCase().match(this.search_keyword) || lesson.location.toLowerCase().match(this.search_keyword)
            });    
            /** >>>>>>>>>>>>>> SORT BASED ON PROPERTY <<<<<<<<<<<<<<<<<< **/ 
            if (this.attribute_sort == "location") {
                newList.sort(this.sortbyLocation)
            }
            else if (this.attribute_sort == "price"){
                newList.sort(this.sortbyPrice)
            }
            else if (this.attribute_sort == "spaces"){
                newList.sort(this.sortbySpaces)
            }
            else{
                newList.sort(this.sortbyTitle)
            }

            /** >>>>>>>> SPECITY ORDER (ascending or descending) <<<<<<<< **/ 
            if (this.sort_order != "ascending"){
                return newList.reverse()
            }
            return newList
        },
        /** Functions to sort based on various poperties **/

        // | >>>>>>>>>>> Sort by title/subject <<<<<<<<<<< | 
        sortbyTitle: function(a, b){
            if ( a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            }
            if ( a.title.toLowerCase() > b.title.toLowerCase()){
                return 1;
            }
            return 0;
        },
        // | >>>>>>>>>>> Sort by Location <<<<<<<<<<< | 
        sortbyLocation: function(a, b){
            if ( a.location.toLowerCase() < b.location.toLowerCase()){
                return -1;
            }
            if ( a.location.toLowerCase() > b.location.toLowerCase()){
                return 1;
            }
            return 0;
        },
        // | >>>>>>>>>>> Sort by price <<<<<<<<<<< | 
        sortbyPrice: function(a, b){
            return a.price-b.price;
        },
        // | >>>>>>>>>>> Sort by spaces <<<<<<<<<<< | 
        sortbySpaces: function(a, b){
            return a.spaces-b.spaces;
        }
    }
})