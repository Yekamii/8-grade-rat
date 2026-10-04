let isRunning = false;

function runStrainExperiment(strainType) {
    if (isRunning) return;
    isRunning = true;

    toggleButtons(true);

    const ratTest = document.getElementById('rat-test');
    const syringeTest = document.getElementById('syringe-test');
    const statusTest = document.getElementById('status-test');
    const testBadge = document.getElementById('test-badge');
    const resultText = document.getElementById('result-text');
    const conclusionText = document.getElementById('conclusion-text');

    // 1. ნემსის ვერტიკალურად ჩამოწევა (წვერით თაგვისკენ)
    syringeTest.classList.add('injecting');
    testBadge.innerText = `შეჰყავთ ${strainType} შტამი...`;
    statusTest.innerText = 'სტატუსი: მიმდინარეობს ინექცია...';

    // 2. 3 წამიანი დაყოვნება შედეგამდე
    setTimeout(() => {
        syringeTest.classList.remove('injecting');

        if (strainType === 'S') {
            ratTest.classList.add('dead');
            statusTest.innerText = 'სტატუსი: ❌ ზღვის გოჭი მოკვდა';
            statusTest.classList.add('dead-status');
            testBadge.innerText = 'S შტამი (პათოგენური)';
            
            conclusionText.innerText = 'მონაცემებიდან გამომდინარე S შტამის ბაქტერია არის მომაკვდინებელი, რადგან უმრავლეს შემთხვევაში ამ ინექციით კვდებოდნენ ზღვის გოჭები.';

            resultText.innerHTML = `
                <strong>❌ შედეგი (S შტამი):</strong> 
                S შტამის ბაქტერიას აქვს დამცავი კაფსულა. 
                ინექციის შეყვანიდან <strong> საცდელი ზღვის გოჭი მოკვდა</strong>.<br>
                <em>შენიშვნა: საკონტროლო ჯგუფის ზღვის გოჭი რჩება ცოცხალი.</em>
            `;
        } else if (strainType === 'R') {
            ratTest.classList.remove('dead');
            statusTest.innerText = 'სტატუსი: ✅ ზღვის გოჭი ცოცხალია';
            statusTest.classList.remove('dead-status');
            testBadge.innerText = 'R შტამი (არაპათოგენური)';

            conclusionText.innerText = 'R შტამის ინექციის შემდეგ ზღვის გოჭი დარჩა ცოცხალი (R შტამი არ არის მომაკვდინებელი).';

            resultText.innerHTML = `
                <strong>✅ შედეგი (R შტამი):</strong> 
                R შტამის ბაქტერიას არ აქვს დამცავი კაფსულა. 
                ინექციის შემდეგ <strong>საცდელი ზღვის გოჭი დარჩა ცოცხალი და ჯანმრთელი</strong>.<br>
                <em>შენიშვნა: საკონტროლო ჯგუფის ზღვის გოჭიც უცვლელად ცოცხალია.</em>
            `;
        }

        toggleButtons(false);
        isRunning = false;
    }, 3000);
}

function resetStage() {
    if (isRunning) return;

    const ratTest = document.getElementById('rat-test');
    const syringeTest = document.getElementById('syringe-test');
    const statusTest = document.getElementById('status-test');
    const testBadge = document.getElementById('test-badge');
    const resultText = document.getElementById('result-text');
    const conclusionText = document.getElementById('conclusion-text');

    ratTest.classList.remove('dead');
    syringeTest.classList.remove('injecting');
    
    statusTest.innerText = 'სტატუსი: ცოცხალი';
    statusTest.classList.remove('dead-status');
    
    testBadge.innerText = 'ელოდება ინექციას';
    conclusionText.innerText = 'ჩაატარეთ ცდა S შტამზე დასკვნის მისაღებად...';
    resultText.innerText = 'აირჩიეთ ერთ-ერთი შტამი (S ან R) ინექციის განსახორციელებლად.';

    toggleButtons(false);
}

function toggleButtons(disabled) {
    document.getElementById('btn-s-strain').disabled = disabled;
    document.getElementById('btn-r-strain').disabled = disabled;
}