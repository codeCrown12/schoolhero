var app = new Vue({
    el: "#app",
    data:{
        activities: [
            {
                id: 0,
                title: "Basket ball",
                location: "New york",
                price: 50,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            },
            {
                id: 1,
                title: "Music",
                location: "Seoul",
                price: 100,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 2,
                title: "Cooking",
                location: "Beijing",
                price: 40,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            },
            {
                id: 3,
                title: "Biology",
                location: "Dubai",
                price: 200,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            },
            {
                id: 4,
                title: "Parkour",
                location: "Dubai",
                price: 500,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1550701035-c0bb32de8aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
            },
            {
                id: 5,
                title: "Mathematics",
                location: "New york",
                price: 700,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=779&q=80"
            },
            {
                id: 6,
                title: "English",
                location: "London",
                price: 500,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1565022536102-f7645c84354a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
            },
            {
                id: 7,
                title: "Physics",
                location: "Washington",
                price: 800,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1611784601826-d17011218c7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 8,
                title: "Chemistry",
                location: "Japan",
                price: 1300,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=417&q=80"
            },
            {
                id: 9,
                title: "Art",
                location: "Paris",
                price: 600,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
            },
            {
                id: 10,
                title: "Coding",
                location: "Mumbai",
                price: 1600,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 11,
                title: "Dancing",
                location: "California",
                price: 1300,
                spaces: 5,
                img_url: "https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            }
        ],
        cart_count: 0,
        search_keyword: "",
        sort_order: "ascending",
        attribute_sort: "title"
    },
    methods: {
        // Logic to add class activity to cart
        addToCart: function(id){
            if (this.activities[id].spaces >= 1) {
                
                // Update the DOM
                this.activities[id].spaces -= 1
                
                // Update activities storage
               this.cart_count += 1
            }
            else{
                this.activities[id].spaces = 0
            }
        },
        // Logic to disable add to cart button if number of spaces reaches zero
        disableAddToCart: function(id){
            if (this.activities[id].spaces >= 1){
                return false
            }
            else{
                return true
            }
        },
        // Logic to disable art button if no items in the cart
        disableCart: function(){
            if (this.cart_count < 1) {
                return true
            }
            return false
        },
        //Logic to filter results based on search keyword
        filteredList: function(){
            let newList = this.activities.filter((lesson) => {
                return lesson.title.toLowerCase().match(this.search_keyword)
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
            return a.price -b.price;
        },
        // | >>>>>>>>>>> Sort by spaces <<<<<<<<<<< | 
        sortbySpaces: function(a, b){
            return a.spaces -b.spaces;
        }
    }
})