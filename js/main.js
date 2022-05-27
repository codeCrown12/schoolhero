var app = new Vue({
    el: "#app",
    data:{
        lessons: [],
        cart_items: [],
        order_details:{
            firstname: "",
            lastname: "",
            mobile: "", 
        },
        search_keyword: "",
        sort_order: "",
        attribute_sort: ""
    },
    methods: {
        // Logic to add class activity to cart
        addToCart: function(lesson){
            if (lesson.spaces >= 1) {
                let lessonInCart = false
                if (this.countCart() >= 1){
                    for (let i = 0; i < this.cart_items.length; i++) {
                        if (this.cart_items[i].id == lesson._id){
                            this.cart_items[i].spaces += 1
                            lessonInCart = true
                            break
                        }
                    }
                    if (lessonInCart == false) {
                        let item = {}
                        item.id = lesson._id
                        item.spaces = 1
                        this.cart_items.push(item)
                    }
                }
                else{
                    let item = {}
                    item.id = lesson._id
                    item.spaces = 1
                    this.cart_items.push(item)
                }
                lesson.spaces -= 1
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
            let cart_items_info = []
            for (let i = 0; i < this.cart_items.length; i++) {
                for (let j = 0; j < this.lessons.length; j++) {
                    if (this.lessons[j]._id == this.cart_items[i].id) {
                        let item = {}
                        item.id = this.cart_items[i].id
                        item.title = this.lessons[j].title
                        item.location = this.lessons[j].location
                        item.price = this.lessons[j].price
                        item.url = this.lessons[j].url
                        item.spaces = this.cart_items[i].spaces
                        cart_items_info.push(item)
                    }   
                }
            }
            return cart_items_info
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
        removeFromCart: function(id, spaces){
            for (let i = 0; i < this.lessons.length; i++) {
                if (this.lessons[i]._id == id) {
                    this.lessons[i].spaces += spaces
                }
            }
            for (let i = 0; i < this.cart_items.length; i++) {
                if (this.cart_items[i].id == id) {
                    this.cart_items.splice(i, 1)
                }
            }
            console.log(this.cart_items)
        },
        
        // Get total price of items in the cart
        totalPrice: function(){
            let sum = 0
            for (let i = 0; i < this.cart_items.length; i++) {
                for (let j = 0; j < this.lessons.length; j++) {
                    if (this.cart_items[i].id == this.lessons[j]._id) {
                        let item_price =  this.cart_items[i].spaces * this.lessons[j].price
                        sum += item_price
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

        // Clear checkout form on successful checkout
        clearCheckoutForm: function(){
            this.order_details.firstname = ""
            this.order_details.lastname = ""
            this.order_details.mobile = ""
        },
        
        // Checkout logic
        checkOut: function(){
            let order = {
                name: this.order_details.firstname +' '+this.order_details.lastname,
                phone_number: this.order_details.mobile,
                items: this.cart_items
            }
            let order_string = (JSON.stringify(order))
            fetch('https://coursework-two-king.herokuapp.com/addorder', {
                method: "POST",
                body: order_string,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json_response => {
                console.log(json_response)
                this.updateSpaces()
            })
            .catch(err => console.log(err))
        },

        // Update spaces in db
        updateSpaces: function(){
            let spaces_upd = []
            for (let i = 0; i < this.cart_items.length; i++) {
                for (let j = 0; j < this.lessons.length; j++) {
                    if (this.cart_items[i].id == this.lessons[j]._id) {
                        let item = {
                            id: this.cart_items[i].id,
                            spaces: this.lessons[j].spaces
                        }
                        spaces_upd.push(item)
                    }
                }    
            }
            let spaces_upd_string = (JSON.stringify(spaces_upd ))
            fetch('https://coursework-two-king.herokuapp.com/updatespaces', {
                method: "PUT",
                body: spaces_upd_string,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.cart_items = []
                this.clearCheckoutForm()
                Swal.fire(
                    'Success!',
                    'Order submitted successfully!',
                    'success'
                )
            })
            .catch(err => console.log(err))
        },

        // Logic to fetch lists from server
        fetchLessons: function(){
            fetch(`https://coursework-two-king.herokuapp.com/getlessons`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.lessons = data
            })
            .catch(err => {
                this.lessons = []
                console.log(`unable to get lessons: ${err}`)
            })
        },

        // Logic to call back end express filter logic
        filterLessons: function(){
            fetch(`https://coursework-two-king.herokuapp.com/getfilteredlessons?filter=${this.search_keyword}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.lessons = data
            })
            .catch(err => {
                this.lessons = []
                console.log(`unable to get lessons: ${err}`)
            })
        },
        
        //Logic to filter results based on search keyword
        sortList: function(){
            /** >>>>>>>>>>>>>> SORT BASED ON PROPERTY <<<<<<<<<<<<<<<<<< **/ 
            if (this.attribute_sort == "location") {
                this.lessons.sort(this.sortbyLocation)
            }
            else if (this.attribute_sort == "price"){
                this.lessons.sort(this.sortbyPrice)
            }
            else if (this.attribute_sort == "spaces"){
                this.lessons.sort(this.sortbySpaces)
            }
            else{
                this.lessons.sort(this.sortbyTitle)
            }

            /** >>>>>>>> SPECITY ORDER (ascending or descending) <<<<<<<< **/ 
            if (this.sort_order == "descending"){
                this.lessons.reverse()
            }
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
    },
    created() {
        this.fetchLessons()
    }
})