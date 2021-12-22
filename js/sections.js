$(document).ready(function(){
    //섹션1: 포트폴리오 타이틀
    //섹션1 글자init
    let _reverse=false
    let timer=100
    let text_count=0;
    let text_length=$(".text_ball").length
    let text_color=["#C9DAEA", "#03F7EB", "#00B295", "#AB2346", "#c74163"]
    let text_interval=setInterval(function(){
        let rand1=Math.floor(Math.random()*100);
        let rand2=Math.floor(Math.random()*100);
        if(!_reverse){
            $(".text_box").children().eq(text_count).addClass("active").css({
                left: rand1+"%",
                top: rand2+"%",
                transform: "rotateZ("+Math.floor(rand1 * 3.6)+"deg)",
                backgroundColor: text_color[rand1 % 5],
            })
            text_count+=1
        }
        if(text_count==text_length){
            clearInterval(text_interval)
        }
    }, timer)
    $(".text_box").click(function(){
        $(this).toggleClass("active")
    })
    setTimeout(()=>{
        $(".text_box").trigger("click")
    }, (timer*8) + 500)
    
    // 섹션2: profile
    let chk_drag=false;
    let chk_pick=false;
    let tmp_posX;
    let tmp_posY;
    $(".card").on({
        mousedown:function(){
            chk_drag=true;
            tmp_posX=event.offsetX
            tmp_posY=event.offsetY
            $(this).addClass("pick")
            
            chk_pick=true;
            if(chk_pick){
                $(".card").css({
                    animation: "none"
                })
                $(".card .info").css({
                    display: "none"
                })
            }
        },
        mouseup:function(){
            chk_drag=false;
            $(this).removeClass("pick")
        }
    })
    $(window).mousemove(function(){
        if(chk_drag){
            $(".card.pick").css({
                // top: event.clientY - tmp_posY,
                // left: event.clientX - tmp_posX
                // top: event.clientY - (popup.outerHeight()/2),
                // left: event.clientX - (popup.outerWidth()/2),

                top: event.clientY -400,
                left: event.clientX -100,
            })
        }
    })
    // 섹션3: 포트폴리오
    for(let i=0; i<$(".img_box").length; i++){
        $(".img_box").eq(i).find("img").eq(0).addClass("on")
    }
    let index=1
    let interval=setInterval(function(){
        for(let i=0; i<$(".img_box").length; i++){
            $(".img_box").eq(i).find("img").delay(100).removeClass("on")
            $(".img_box").eq(i).find("img").eq(index % 3).addClass("on")
        }
        index+=1;
    }, 1000)
    $(".sec3 .img_box, .sec3 .title").click(function(){
        let locateTo=$(this).parents(".content").find("a").attr("href")
        // location.href=locateTo
        window.open(locateTo)
    })
    // 섹션4: 스킬
    // [HTML, CSS, JS, JQ, MySQL, PHP, React, PS, ILLUST]
    let skill_level=["95", "95", "90", "90", "80", "50", "35", "95", "85"]
    let tmpsave_pos_x=new Array;
    tmpsave_init();
    function tmpsave_init(){
        tmpsave_pos_x=new Array;
        for(let i=0; i<skill_level.length; i++){
            tmpsave_pos_x.push("0")
        }
    }
    let start_pos=0;
    let interval_chk=false;
    function sec4_interval(){
        let skill_interval=setInterval(function(){
            interval_chk=true
            for(let i=0; i<skill_level.length; i++){
                if(tmpsave_pos_x[i] < skill_level[i]){
                    tmpsave_pos_x[i]=start_pos
                    $(".skill").eq(i).find(".gauge_bar").css({left: (start_pos-100)+"%"})
                    $(".skill").eq(i).find("h2").text((start_pos)+"%")
                    if(start_pos >= 80){
                        $(".skill").eq(i).addClass("good")
                    }
                }
            }
            start_pos+=1;
            if(start_pos >= 100){
                interval_chk=false
                clearInterval(skill_interval)
            }
        }, 10)
    }
    if($("#skills").offset().top==$(window).scrollTop()){
        sec4_interval();
    }
    $(window).scroll(()=>{
        if($("#skills").hasClass("on")){
            if(!interval_chk){
                sec4_interval();
            }
        }
        tmpsave_init();
        start_pos=0;
    })
})