if (performance.navigation.type == 1) {
    $('html, body').scrollTop(0);
}

window.addEventListener('load', function () {
    let isClickFired = false;
    let timer = null;

    let radarChart = document.getElementById('radar-chart').getContext('2d');

    let dataRadarProgramming = {
        labels: ['C', 'C++', 'Java', 'C#', 'SQL', 'Python', 'JavaScript', 'HTML', 'CSS'],
        datasets: [{
            data: [3, 3, 4, 4, 3, 5, 4, 4, 4],
            fill: true,
            backgroundColor: ['rgba(255, 142, 110, 0.25)'],
            borderColor: ['rgba(255, 142, 110, 1)'],
            pointBackgroundColor: 'rgba(255, 142, 110, 1)',
            pointBorderColor: ['rgba(255, 142, 110, 1)']
        }]
    };

    let optionsRadarProgramming = {
        responsive: true,
        title: {
            display: true,
            text: "Skills on programming/markup languanges",
            fontFamily: "Inter",
            fontSize: 14,
            padding: 40
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scale: {
            ticks: {
                min: 0,
                max: 5,
                stepSize: 1
            },
            pointLabels: {
                fontFamily: "Inter",
                fontStyle: "bold",
                fontSize: 12
            }
        }
    };

    let dataRadarInit = {
        labels: ['Machine Learning', 'OOP', 'Database', 'Software Engineering', 'Front-end', 'Back-end']
    };

    let dataRadarKnowledges = {
        labels: ['Machine Learning', 'OOP', 'Database', 'Software Engineering', 'Front-end', 'Back-end',],
        datasets: [{
            data: [4, 4, 3, 3, 4, 3],
            fill: true,
            backgroundColor: ['rgba(227, 104, 132, 0.25)'],
            borderColor: ['rgba(227, 104, 132, 1)'],
            pointBackgroundColor: 'rgba(227, 104, 132, 1)',
            pointBorderColor: ['rgba(227, 104, 132, 1)']
        }]
    };

    let optionsRadarKnowledges = {
        responsive: true,
        title: {
            display: true,
            text: "Knowledges on some common CS topics",
            fontFamily: "Inter",
            fontSize: 14,
            padding: 40
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scale: {
            ticks: {
                min: 0,
                max: 5,
                stepSize: 1
            },
            pointLabels: {
                fontFamily: "Inter",
                fontStyle: "bold",
                fontSize: 12
            }
        }
    };

    let myRadarChart = new Chart(radarChart, {
        type: "radar",
        data: dataRadarInit,
        options: optionsRadarKnowledges
    });

    function updateElasticSelectorCharts() {
        let activeNavbarChartsItem = $('body').find('.navbar-charts-item.active'),
            activeWidth = activeNavbarChartsItem.innerWidth(),
            startPosition = activeNavbarChartsItem.parent().position().left,
            itemPosition = activeNavbarChartsItem.position().left;

        $(".selector-charts").css({
            "left": startPosition + itemPosition + "px",
            "width": activeWidth + "px"
        });
    }

    function updateChart() {
        resetCanvas();
        if (!$('.navbar-charts-item.active').index()) {
            myRadarChart = new Chart(radarChart, {
                type: "radar",
                data: dataRadarKnowledges,
                options: optionsRadarKnowledges
            });
        } else {
            myRadarChart = new Chart(radarChart, {
                type: "radar",
                data: dataRadarProgramming,
                options: optionsRadarProgramming
            });
        }
    }

    function resetCanvas() {
        $('canvas').remove();
        $('.radar-chart-wrapper').append('<canvas id="radar-chart" style="width: 450px; height: 450px;"></canvas>');
        radarChart = document.getElementById('radar-chart').getContext('2d');
    }

    window.addEventListener('resize', function () {
        updateElasticSelectorCharts();
        adjustHeights();
        // updateChart(); 
        // TODO: Mobile browser triggers resize event even with a simple scroll.
        // This is due to the address bar in the process of hiding. 
    });

    window.addEventListener('orientationchange', function () {
        adjustHeights();
        updateElasticSelectorCharts();
        updateChart();
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".hamburger").classList.toggle("is-active");
        document.querySelector(".navbar-links").classList.toggle("open");
        document.querySelector("header").classList.toggle("hamburger-open");
        document.querySelector(".container-cta").classList.toggle("hamburger-open");
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            isClickFired = true;
            timer = Date.now();

            $('.navbar-item').removeClass("active");
            $('.underline-gradient').removeClass("active");

            let activeIndex = -1;
            let clickedHref = this.getAttribute('href');

            if (clickedHref === "#showcase" || clickedHref === "#header") {
                clickedHref = "#showcase";
                activeIndex = 0;
            } else if (clickedHref === "#academic") {
                activeIndex = 1;
            } else {
                activeIndex = 2;
            }

            $('.underline-gradient').eq(activeIndex).addClass("active");

            if ($(".hamburger").hasClass("is-active")) {
                document.querySelector(".hamburger").classList.toggle("is-active");
                document.querySelector(".navbar-links").classList.toggle("open");
                document.querySelector("header").classList.toggle("hamburger-open");
                document.querySelector(".container-cta").classList.toggle("hamburger-open");
            }

            document.querySelector(clickedHref).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.navbar-charts-item').forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();

            $('.navbar-charts-item').removeClass('active');
            $(this).addClass('active');

            updateElasticSelectorCharts();
            updateChart();
        })
    });

    window.addEventListener('scroll', function () {
        let currentPosition = (document.documentElement.scrollTop || document.body.scrollTop) + 150,
            showcaseSectionHeight = $('#showcase').height(),
            academicSectionHeight = $('#academic').height(),
            items = $(".timeline-line");

        let currentSection = -1;

        if (currentPosition < showcaseSectionHeight) {
            currentSection = 0;
        } else if (currentPosition < showcaseSectionHeight + academicSectionHeight) {
            currentSection = 1;
        } else {
            currentSection = 2;
        }

        if (!isClickFired) {
            $('.navbar-item').removeClass("active");
            $('.underline-gradient').removeClass("active");
            $('.navbar').children().eq(currentSection).addClass('active');
            $('.underline-gradient').eq(currentSection).addClass("active");
        }

        if (currentSection > 0) {
            $('.me-nav, .me-nav-wrapper-info').addClass('visible');
        } else {
            $('.me-nav, .me-nav-wrapper-info').removeClass('visible');
        }

        if (currentSection == 1) {
            $('.timeline-header').addClass('visible');
            $('.initial-dot').addClass('active');
            for (let i = 0; i < items.length; i++) {
                $(items[i]).addClass("active");
                $(items[i].firstElementChild).addClass("active");
            }
            $('.eraser-timeline').addClass('active');
            $('.acquired-knowledges').addClass('visible');
        }

        if (currentSection == 2) {
            if (!$('.charts-wrapper.animation-done').length) {
                myRadarChart = new Chart(radarChart, {
                    type: "radar",
                    data: dataRadarKnowledges,
                    options: optionsRadarKnowledges
                });
                $('.charts-wrapper').addClass('animation-done');
            }
            $('.eraser').addClass('active');
        }

        if (Date.now() - timer > 1000) {
            isClickFired = false;
            timer = null;
        }
    });

    function adjustHeights() {
        let innerWrapperSummaryHeight = $('.inner-wrapper-summary').innerHeight();
        let innerChartsWrapperHeight = $('.inner-charts-wrapper').innerHeight();

        let innerWrapperSkillsHeight = innerWrapperSummaryHeight + innerChartsWrapperHeight;
        let adjustedHeight = innerWrapperSkillsHeight + (75 * 2);

        if (window.innerWidth < 1000) {
            $('.page-skills').css({
                'height': innerWrapperSkillsHeight + 'px',
                'min-height': adjustedHeight + 'px'
            });
        } else {
            $('.page-skills').css({
                'height': '100%',
                'min-height': '900px'
            });
        }
    }

    adjustHeights();
    updateElasticSelectorCharts();
});
