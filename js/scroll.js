$(document).ready(function(){
    let s_top=$(window).scrollTop();
    let header_o_top=$("nav").offset().top;
    header_o_top=$(window).height() - 100
    let timer=500; // slide transition

    // offset()배열 << array
    let sec_o_top=[]
    let sec_o_bot=[]
    let menu_array=["home", "about_me", "portfolio", "skills", "contact"]
    let indi_text=["home(H)", "about me(M)", "portfolio(P)", "skills(S)", "contact(C)"]
    let hotkey=["72", "77", "80", "83", "67"]
    // init
    let currentSection=0;
    for(let i=0; i<$(".sec").length; i++){
        sec_o_top[i]=$(".sec").eq(i).offset().top
        sec_o_bot[i]=sec_o_top[i]+$(".sec").eq(i).height()
        $('<div class="indi"><div class="indi_text">'+indi_text[i].toUpperCase()+'⇀</div><div>').appendTo(".indicator_box")
        $(".sec").eq(i).attr('id', menu_array[i])
    }
    $(".menu_ul li").eq(0).addClass("active")
    $(".indi").eq(0).addClass("active")
    // 메뉴, indi 클릭시 => time 0
    $(".indi, .menu_ul li").click(function(){
        index_active($(".indi"), $(this).index(), "active")
        index_active($(".menu_ul li"), $(this).index(), "active")
        index_active($(".sec"), $(this).index(), "on")
        $("html, body").animate({
            scrollTop: sec_o_top[$(this).index()]
        }, 0)
        currentSection=$(this).index()
    })
    ////이벤트 << event
    let wheel;
    let _chk_scroll=true;
    let tmpOtop;
    $(".sec").on("mousewheel DOMMouseScroll", function(){
        event.preventDefault();
        wheel=event.wheelDelta
        let realIndex;
        if(_chk_scroll){
            _chk_scroll=false;
            setTimeout(()=>{_chk_scroll=true;}, timer);
            if(wheel<0 && $(this).next().length!=0){
                realIndex=$(this).next().index()
            }
            else if(wheel>0 && $(this).prev().length!=0){
                realIndex=$(this).prev().index()
            }
            tmpOtop=$(".sec").eq(realIndex).offset().top
            $("html, body").animate({
                scrollTop: tmpOtop
            }, timer);

            index_active($(".sec"), realIndex, "on")
            index_active($(".indi"), realIndex, "active")
            index_active($(".menu_ul li"), realIndex, "active")
            if(realIndex==2){
                setTimeout(function(){
                    document.querySelector(".sec3").classList.add("active")
                    document.querySelector(".sec3.active  .left").addEventListener("mouseenter", function(){
                        document.querySelector(".sec3").classList.remove("active")
                    })
                    document.querySelector(".sec3.active  .left").addEventListener("mouseleave", function(){
                        document.querySelector(".sec3").classList.add("active")
                    })
                }, 500)
            }
            else {
                document.querySelector(".sec3").classList.remove("active")
            }
        }
    })
    $(document).keydown(function(){
        for(let i=0; i<hotkey.length; i++){
            if(event.keyCode==hotkey[i]){
                $("html, body").animate({
                    scrollTop: $(".sec").eq(i).offset().top
                }, 0);
            }
        }
        if(event.keyCode=="38" || event.keyCode=="40"){
            event.preventDefault();
            if(event.keyCode=="40" && $(".sec.on").next().length!=0){
                tmpOtop=$(".sec.on").next().offset().top;
                let tmp_index=$(".sec.on").index();
                $("html, body").animate({
                    scrollTop: tmpOtop
                }, 0);
                $(".sec").removeClass("on")
                $(".sec").eq(tmp_index).next().addClass("on")
            }
            else if(event.keyCode=="38" && $(".sec.on").prev().length!=0){
                tmpOtop=$(".sec.on").prev().offset().top;
                let tmp_index=$(".sec.on").index();
                $("html, body").animate({
                    scrollTop: tmpOtop
                }, 0);
                $(".sec").removeClass("on")
                $(".sec").eq(tmp_index).prev().addClass("on")
            }
            $("html, body").animate({
                scrollTop: tmpOtop
            }, timer);
        }
    })
    // 헤더
    $("nav").animate({
        bottom: "0px"
    }, 800)
    let h_fix_chk=false;
    $(window).scroll(function(){
        s_top=$(window).scrollTop();
        // 헤더픽스
        if(s_top >= header_o_top){
            if(!h_fix_chk){
                $("nav").addClass("fixed").animate({
                    bottom: "-100px"
                }, 200)
                setTimeout(()=>{
                    $("nav").css({
                        bottom: "auto",
                        top: "-100px"
                    }).animate({
                        top: "0"
                    }, 200)
                }, 200)
                h_fix_chk=true;
            }
        }
        else{
            if(h_fix_chk){
                $("nav").removeClass("fixed").css({
                    top: "-100px",
                }, 200)
                setTimeout(()=>{
                    $("nav").css({
                        top: "auto",
                        bottom: "-100px"
                    }).animate({
                        bottom: "0"
                    }, 200)
                }, 200)
                h_fix_chk=false;
            }
        }
        for(let i=0; i<$(".sec").length; i++){
            if(sec_o_top[i] <= s_top && s_top < sec_o_bot[i]){
                currentSection=i;
                break;
            }
        }
    });
});