
var vi_language = {
    'appointment_time': 'Appointment Time',
    'google_ads_external_customer_id': 'Google Ads External Customer ID',
    'phone_prefix' : "+84",
};

var vi_api_blog = 'https://cdtx.lyl.vn/wordpress/wp-json/tagteam/blogs';

var vi_sendFirstEmail = () => {

    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    
    var caseId = document.querySelector('.case-id').innerText;
    document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
    document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));


    waitForElm('material-list.options-list').then((elm) => {
        document.querySelector('material-list.options-list .item:nth-child(1)').click();
        waitForElm('[debug-id="contact-info-name"]').then(elm => {
            waitForElm('[aria-label="Create new email"]').then(elm => {
                elm.click();
                
                waitForElm('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top').then(function (elm) {
                    
                    waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
                        elm.click();

                        waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
                            elm.click();

                            waitForElm('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) .is-top .subject').then(elm => {
                                elm.value = `Đội giải pháp kỹ thuật - Xác nhận lịch hẹn [${caseId}]`;
                                elm.dispatchEvent(new Event('input'));
                                
                                    waitForElm('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) .is-top .editor-frame #email-body-content-top').then(emailBodyTop => {
                                        
                                        var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
                                        var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
                                        var name = document.querySelector('.internal-user-info .name').innerText;
                                        var inviteHtml = `<p dir="auto">Xin chào <b>${name}</b>,</p><p dir="auto">Cảm ơn bạn đã lên lịch hẹn với Đội giải pháp kỹ thuật đại diện cho Google. Người Quản lý tài khoản Google của bạn đã thay mặt bạn yêu cầu cuộc hẹn này và chúng tôi sẽ hỗ trợ bạn với mã trường hợp: <b>${caseId}</b> cho website: <b>${url}</b>.</p><p dir="auto">Vui lòng kiểm tra hộp thư đến để biết lịch mời cuộc hẹn sắp tới với chúng tôi và làm theo hướng dẫn để xác nhận tham gia. Trước khi cuộc gọi diễn ra, vui lòng xem và hoàn thành danh sách việc cần làm qua liên kết <a href="https://support.google.com/google-ads/answer/11605860?hl=vi" style="color: rgb(26, 115, 232); text-decoration-line: none;" class="ignore-globals">này</a>.</p><p dir="auto">Nếu bạn có bất kỳ câu hỏi nào trước cuộc gọi với chúng tôi hoặc muốn thêm người tham gia, vui lòng cho chúng tôi biết bằng cách trả lời email này hoặc liên hệ với Người Quản lý tài khoản Google của bạn</p><p dir="auto">Chúng tôi rất mong được làm việc với bạn.</p><p dir="auto">Trân trọng,<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
                                        var agentSign = '<div style="font:normal 13px/17px Roboto,sans-serif;display:block">' + emailBodyTop.querySelectorAll('.replaced')[1].innerHTML + '</div>';
                                        var note = `<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block"><em>Lưu ý: Nếu sau này bạn cần nêu mã vé hỗ trợ này, thì mã là <span class="replaced">${caseId}</span></em></div>`;
                                        emailBodyTop.innerHTML = inviteHtml + agentSign + note;
                                        document.execCommand("insertText", false, " ");
                                    })
                            });
                        });
                    });
                });
            });
        });
        document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
    });
}

var vi_TagteamFocusCase = () => {
    try {
        // console.log('ok')
        // ==== CODE - VAN BO
        var css = `#signature{
            background-color: #d0ecff;
        padding: 10px;
        }
        #signature {
            font-family: Google Sans,Helvetica,Arial;
        }
        #signature .form-group {
        width: 100%;
        display: flex;
        margin: 0.5em;
            align-items: center;
        }
        #signature .form-group .form-control:focus {
        outline: none;
        }
        #signature .form-group .form-control {
        width: 400px;
        border: 1px solid #99c2fa;
        border-radius: 4px;
            padding: 8px 4px;
        }
        #signature .form-group button, #addToNote, #signatureBtn{
            background-color: #599fff; 
            border: none;
            color: white;
            text-decoration: none;
            margin: 0 15px;
            border-radius: 3px;
                padding: 9px 18px;
                cursor: pointer;
        }
        #addToNote{
            padding: 15px 30px;
            margin: 15px;
        }
        #signature .form-group label{
            font-weight: 600;
            width: 20%;
            text-align: left;
        }
        #signature #task {
                display: inline-block;
            padding: 16px 0;
        }
        #signature #task label {
                margin-right: 20px;
        }
        #signature option:nth-child(2n-1) {
            background: #f6f6f6;
        }
        .modal {
        display: none;
        position: fixed;
        z-index: 999;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
        }
        
        /* Modal Content */
        .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s;
        text-align: center;
        }
        /* The Close Button */
        .close {
        color: #599fff;
        float: right;
        font-size: 28px;
        font-weight: bold;
        }
        
        .close:hover,
        .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
        }
        
        .modal-header {
        padding: 2px 16px;
            background: #d0ecff;
            color: #599fff;
            font-weight: bold;
        }
        
        
        /* Add Animation */
        @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0} 
        to {top:0; opacity:1}
        }
        
        @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
        }`;var head = document.head || document.getElementsByTagName('head')[0];var style = document.createElement('style');head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet){
        style.styleSheet.cssText = css;
        } else {
        style.appendChild(document.createTextNode(css));
        }
        var caseId = document.querySelector('.case-id').innerText;
        var showMoreBtn = document.querySelector('.more-less-button:not(.show-more)');if(showMoreBtn) {showMoreBtn.click()}var hiddenPhone = document.querySelector("span[aria-label='View hidden phone number']");if(hiddenPhone) {hiddenPhone.click();}document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();var caseSumary = document.querySelector('[aria-label="Enter a case summary"]');caseSumary.style.backgroundColor = '#FFFC22';caseSumary.style.fontWeight = 'bold';prepareForEmail();
        var tasks = [];
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }
        
                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });
        
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
        
        function prepareCR(){
        var dialog = document.querySelector('material-dialog footer');
        var hotkeys = [
            'AS - Work in Progress - Offline Support::ts as wip offtfr',
            'AS - Work in Progress - Offline Support::ts as wip offs',
            'AS - Reschedule 1::ts as resched1',
            'AS - Acceptable Reschedule::ts as reschedok',
            'SO - Verified::ts so verif',
            'SO - Verified No Recent Conversion::ts so verif nrc',
            'SO - Unverified::ts so unv',
            'SO - Verification Not Needed::ts so vnn',
            'NI - Awaiting Inputs::ts ni ai',
            'NI - In Consult::ts ni ic',
            'NI - Awaiting Validation::ts ni av',
            'NI - Attempted Contact::ts ni ac',
            'NI - Other::ts ni oth',
            'IN - Infeasible::ts in inf',
            'IN - Not Reachable::ts in nrch',
            'IN - Not Interested::ts in ni',
            'IN - Not Ready::ts in nrdy',
            'IN - Out of Scope - Rerouted to Internal Team::ts in oost',
            'IN - Out of Scope - Unable to Transfer::ts in oosu',
            'IN - Out of Scope - Email to Seller::ts in oos seller',
            'IN - Other::ts in oth'
            ];
            var subjects = {
                'ts as wip offtfr':'Đội giải pháp kỹ thuật - Thông báo',
                'ts as wip offs':'Đội giải pháp kỹ thuật - Thông báo',
                'ts as resched1':'Đội giải pháp kỹ thuật - Đặt lại lịch hẹn lần 2',
                'ts as reschedok':'',
                'ts so verif':'Đội giải pháp kỹ thuật – Đã xác minh lượt hiển thị/lượt chuyển đổi',
                'ts so verif nrc':'Đội giải pháp kỹ thuật - Xác nhận triển khai thành công',
                'ts so unv':'Đội giải pháp kỹ thuật - Triển khai Tag đã hoàn tất',
                'ts so vnn':'Đội giải pháp kỹ thuật - Triển khai thành công',
                'ts ni ai':'Đội giải pháp kỹ thuật – Chờ thông tin phản hồi từ nhà quảng cáo',
                'ts ni ic':'Đội giải pháp kỹ thuật - Thông báo',
                'ts ni av':'Đội giải pháp kỹ thuật – Đợi xác minh lượt chuyển đổi - dữ liệu',
                'ts ni ac':'Đội giải pháp kỹ thuật – Không liên hệ được nhà quảng cáo',
                'ts ni oth':'Đội giải pháp kỹ thuật - Thông báo',
                'ts in inf':'Đội giải pháp kỹ thuật – Không thể cài đặt',
                'ts in nrch':'Đội giải pháp kỹ thuật – Không nhận được phản hồi từ nhà quảng cáo',
                'ts in ni':'Đội giải pháp kỹ thuật – Nhà quảng cáo không cần hỗ trợ',
                'ts in nrdy':'Đội giải pháp kỹ thuật – Nhà quảng cáo chưa sẵn sàng',
                'ts in oost':'Đội giải pháp kỹ thuật – Chuyển yêu cầu cho đội ngũ thích hợp',
                'ts in oosu':'Đội giải pháp kỹ thuật - Thông báo',
                'ts in oos seller':'Đội giải pháp kỹ thuật - Thông báo',
                'ts in oth':'Đội giải pháp kỹ thuật – Trường hợp khác',
            };
        
            var crList = document.createElement('ul');
            crList.setAttribute('id','cr-list');
            crList.style.overflow = 'auto';
            crList.style.height = '300px';
            hotkeys.forEach(function(hotkey) {
                var li = document.createElement('li');
                li.innerText = hotkey;
                li.style.padding = '6px 0px ';
                li.style.cursor = 'pointer';
                if(/SO/.test(hotkey)){
                li.style.color = '#207d02';
                } else if(/NI/.test(hotkey)){
                li.style.color = '#944e00';
                } else if(/AS/.test(hotkey)){
                li.style.color = '#770087';
                }
                li.addEventListener('click', function(){
                var input = document.querySelector('canned-response-dialog search-panel input');
                var key = hotkey.split('::')[1];
                input.value = key;
                    input.dispatchEvent(new Event('input'));
                input.click();input.focus();
                var divLoading = document.createElement('div');
                divLoading.innerText = 'Đang tìm template, chờ xíu..';
                divLoading.style.width = '100%';
                divLoading.style.height = '100%';
                divLoading.style.textAlign = 'center';
                divLoading.style.color = '#FF5100';
                divLoading.style.fontWeight = 'bold';
                document.querySelector('canned-response-dialog search-panel').appendChild(divLoading);
                waitForElm('.suggestion-list .list-item .text-segment').then(elm => {
                    elm.click();
                    divLoading.remove();
                        document.querySelector('.is-top .subject').value = `${subjects[key]} cho trường hợp [${caseId}]`;
                        document.querySelector('.is-top .subject').dispatchEvent(new Event('input'));
                });
                
                });
                li.addEventListener('mouseover', function(){
                this.style.background = '#E5E5E5';
                });
                li.addEventListener('mouseout', function(){
                this.style.background = 'none';
                });
                li.addEventListener('mousedown', function(){
                this.style.background = '#D7D7D7';
                });
                li.addEventListener('mouseup', function(){
                this.style.background = '#E5E5E5';
                });
                
                crList.appendChild(li);
            });
            var showMoreHotkey = document.createElement('li');
            showMoreHotkey.innerText = 'More hotkeys...';
            showMoreHotkey.style.padding = '6px 0px ';
            showMoreHotkey.style.cursor = 'pointer';
            showMoreHotkey.style.color = '#FF3508';
            showMoreHotkey.addEventListener('click', function(){
                    window.open('https://docs.google.com/spreadsheets/d/1qbcpmGVsQn1S5JQasFUJgdhTggH8k6YCSop5d8tYUFI/edit#gid=2036220864https://docs.google.com/spreadsheets/d/1qbcpmGVsQn1S5JQasFUJgdhTggH8k6YCSop5d8tYUFI/edit#gid=2036220864', '_blank').focus();
                });
            crList.appendChild(showMoreHotkey);
            dialog.appendChild(crList);
        }
        
        function prepareForEmail(isGCC = false){
        waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
            elm.click();
            waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
            elm.click();
        
            waitForElm('[aria-label="Insert canned response"]').then(crBtn => {
                crBtn.addEventListener('click', function(){
                    waitForElm('material-dialog footer').then(dialog => {
                        if(!document.querySelector('#cr-list')) {prepareCR()};
                    });
                });
            });
            if(isGCC) {
                var emailCC = document.evaluate('//span[contains(text(),"CC")]//following-sibling::email-address-input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                var emailBCC = document.evaluate('//span[contains(text(),"BCC")]//following-sibling::email-address-input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                emailBCC.querySelector('input').value = emailCC.querySelector('.value').innerText;
                emailBCC.querySelector('input').dispatchEvent(new Event('input'));
                waitForElm('focus-trap [debug-id="email"]').then(item => {
                    item.click();
                        emailCC.querySelector('.remove').click(); 
                });
            }
            });
        });
        }
        var listOfImportantFields = ['Appointment Time', 'Sales Program', 'Attribution Model for the New Conversion Action', 'Tasks', 'Case Summary', 'Instructions for the Implementation (Guide)', 'Copied to'];
        
        listOfImportantFields.forEach(function(field, index) {
        var xpath = `//div[contains(@class, 'form-label')][contains(text(),'${field}')]//following-sibling::div`;
        var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(matchingElement) {
            matchingElement.style.backgroundColor = '#FFFC22'; 
            matchingElement.style.fontWeight = 'bold';
        
            if(field == 'Appointment Time') {
                var _thischeck_time = function(stt = 1) {
                    
                    var timeOptions = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var appointmentTime  = new Date(matchingElement.innerText);


                    if(appointmentTime == 'Invalid Date') {
                        if(stt < 4) {
                            var next_stt = stt + 1;
                            setTimeout(function() {
                                _thischeck_time(next_stt);
                            }, 2000)
                        }
                    } else {
                        var yourLanguageTime = appointmentTime.toLocaleString('vi-VN', timeOptions);
                        matchingElement.innerText = yourLanguageTime;
                        console.log("Appointment Time", yourLanguageTime);
                    }
                }

                // Begin
                _thischeck_time();
            }
            if(field == 'Copied to'){
            matchingElement.querySelector('.value').className += ' copied-to';
            var siblingCopi = matchingElement.nextElementSibling;
            while(siblingCopi != null) {
                siblingCopi.querySelector('.value').className += ' copied-to';
                siblingCopi = siblingCopi.nextElementSibling;
                    }
            }
            if(field == 'Tasks'){
            tasks.push(matchingElement.innerText);
            var siblingTask = matchingElement.nextElementSibling;
            while(siblingTask != null) {
                tasks.push(siblingTask.innerText);
                siblingTask.style.background = '#FFFC22';
                siblingTask.style.fontWeight = 'bold';
                siblingTask = siblingTask.nextElementSibling;
                    }
            }
            
            if(field == 'Sales Program'){
            setInterval(function(){
                var isGCC = matchingElement.innerText.includes('GCC');
                waitForElm('[aria-label="Create new email"]').then(elm => {
                    elm.addEventListener('click', function(){prepareForEmail(isGCC)});
                })
            },1000);
            }
        }
        
        });
        
        waitForElm('pii-value[debug-id="pii-value"] .value:not(.copied-to)').then((elm) => {
            elm.style.backgroundColor = '#FFFC22';
            elm.style.fontWeight = 'bold';
            elm.addEventListener('click',function(){
            navigator.clipboard.writeText(elm.innerText);
            alert('you have copied the phone number');
            })
        });
        waitForElm('material-list.options-list').then((elm) => {
            document.querySelector('material-list.options-list .item:nth-child(1)').click();
        });
        
        var cidPath = `//div[contains(@class, 'data-pair-label')][contains(text(),'Google Ads External Customer ID')]//following-sibling::div`;
        var cidRaw = document.evaluate(cidPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
        var cid = cidRaw.slice(0,3)+'-'+cidRaw.slice(3,6)+'-'+cidRaw.slice(6);
        // var gearlooseHtml = `<icon id="gearloose" class="content _ngcontent-vwc-7">
        //         <a class="tool" target="_blank" href="https://gearloose2.corp.google.com/#/search/merchants?q=awid:${cid}" data-tooltip="Gearloose 2.0"><img src="https://lh3.googleusercontent.com/proxy/mawyrjPH2gsWpZuGnLpIXCiXkuhJ69RZaP7ypPqMX5QGTtXDUPQncooBaQUc6V0uRI5h1fZABTXr5wgJPU0ptpxjQ1NyDke2y6tEbx5HG6K0H1Q" style="width:100%;border-radius: 0 0 16px 19px;"> </a>
        //         </icon>`;
        // var gearlooseElm = document.createElement('material-button');
        // gearlooseElm.innerHTML = gearlooseHtml;
        // if(!document.getElementById('gearloose')) document.querySelector('.decks .dock-container').appendChild(gearlooseElm);
        
        var oncallSignature = document.createElement('div');
        oncallSignature.innerHTML = `<div id="sinature-modal" class="modal">
            <div class="modal-content">
                        <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Oncall Note</h2>
                </div>
                <div id="signature">
                <div class="form-group">
                    <label for="">Speakeasy ID</label>
                    <input type="text" aria-label="Speakeasy ID" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="">Sub-status</label>
                    <select class="form-control" aria-label="Sub-status" style="background: #fff;width: 410px;">
                                <option value="AS - Work in Progress">AS - Work in Progress</option><option value="AS - Reschedule 1">AS - Reschedule 1</option><option value="AS - Reschedule 2">AS - Reschedule 2</option><option value="AS - Acceptable Reschedule">AS - Acceptable Reschedule</option><option value="NI - Awaiting Inputs">NI - Awaiting Inputs</option><option value="NI - In Consult">NI - In Consult</option><option value="NI - Awaiting Validation">NI - Awaiting Validation</option><option value="NI - Attempted Contact">NI - Attempted Contact</option><option value="NI - Other">NI - Other</option><option value="SO - Verified">SO - Verified</option><option value="SO - Unverified">SO - Unverified</option><option value="SO - Verification Not Needed">SO - Verification Not Needed</option><option value="IN - Infeasible">IN - Infeasible</option><option value="IN - Out of Scope - Rerouted">IN - Out of Scope - Rerouted</option><option value="IN - Not Reachable">IN - Not Reachable</option><option value="IN - Not Interested">IN - Not Interested</option><option value="IN - Not Ready">IN - Not Ready</option><option value="IN - Reschedule Limit Exceeded">IN - Reschedule Limit Exceeded</option><option value="IN - Other">IN - Other</option><option value="DC - Not Needed">DC - Not Needed</option><option value="DC - Test Case">DC - Test Case</option><option value="DC - Out of Scope - Rerouted">DC - Out of Scope - Rerouted</option><option value="Other">Other</option>
                                </select>
                </div>
                <div class="form-group">
                    <label for="">Sub-status Reason</label>
                    <select class="form-control" aria-label="Sub-status Reason" style="background: #fff;width: 410px;"><option value="">--None--</option><option value="Impressions Received">Impressions Received</option><option value="Conversions tracked">Conversions tracked</option><option value="Impressions NOT Received">Impressions NOT Received</option><option value="Conversions NOT Tracked">Conversions NOT Tracked</option><option value="Not Applicable">Not Applicable</option></select>
                </div>
                            <div class="form-group">
                    <label for="">Tasks Implemented</label>
                                <div id="task"></div>
                </div>
                            <div class="form-group">
                    <label for="">Conversion Ids</label>
                    <input class="form-control" aria-label="Conversion Ids"type="text" />
                </div>
        
                <div class="form-group">
                    <label for="">On Call Comments</label>
                    <textarea class="form-control" aria-label="On Call Comments" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <label for="">Follow up date</label>
                    <input class="form-control" aria-label="Follow up Date" type="datetime-local" />
                </div>
        
                <button id="addToNote" onclick="addToNote()">Add to note</button>
                            <input type="checkbox" id="pre-call-bo" value> <label for="pre-call-bo">Add pre-call</label>
                </div>
            </div>
            </div>`;
        var taskImplemented = oncallSignature.querySelector('#task');
        var taskHtml = '';
        tasks.forEach(task => {
        taskHtml += `<input type="checkbox" name="tasks" id="${task}" value="${task}"> <label for="${task}"> ${task}</label>`;
        });
        taskImplemented.innerHTML = taskHtml;
        document.querySelector('body').appendChild(oncallSignature);
        var modal = document.getElementById("sinature-modal");
        var signatureBtn = document.createElement('button');
        signatureBtn.id = "signatureBtn";
        signatureBtn.innerText = 'Oncall Form Submit';
        if(!document.querySelector('#signatureBtn')) {document.querySelector('#read-card-tab-panel-home .section.header.home').appendChild(signatureBtn)}
        else {
        document.querySelector('#signatureBtn') = signatureBtn;
        };
        signatureBtn.onclick = function() {
        modal.style.display = "block";
        oncallSignature.querySelectorAll('.form-control').forEach(val => {val.value = ''});
        };
        var closeSpan = oncallSignature.querySelector('.close');
        closeSpan.onclick = function(event) {
        modal.style.display = "none";
        };
        function addToNote(){
        var tasks = [];
        var seIds = document.querySelector('[aria-label="Speakeasy ID"]').value;
        seIds = seIds.replace(/\s/g,'').split(',');
        seIds = seIds.map(id => {
            return `<a class="speakeasy-recording" target="_blank" href="https://contactcenter.corp.google.com/quality/player/?recording_id=${id}">${id}</a>`;
        }).join(', ');
        var subStatus = document.querySelector('[aria-label="Sub-status"]').value;
        var subStatusReason = document.querySelector('[aria-label="Sub-status Reason"]').value;
        var oncallCmts = document.querySelector('[aria-label="On Call Comments"]').value;
        var flupDate = document.querySelector('[aria-label="Follow up Date"]').value;
        var taskImplemented = [...document.querySelectorAll('[name="tasks"]:checked')].map(task => task.value).join(', ');
        var conversionIds = document.querySelector('[aria-label="Conversion Ids"]').value;
        var preCall = document.querySelector('#pre-call-bo').checked;
        flupDate = flupDate ? new Date(flupDate) : null;
        if(flupDate) {var flupDateString = flupDate.toLocaleString('vi-VN',{year: 'numeric', month: 'numeric', day: 'numeric'});}
        document.querySelector('[aria-label="Case Note"]').innerHTML += `
        ${ preCall ? `<ul dir="auto"><li>Emails or feedback from Advertiser/Seller (including seller request to join the call)[C]&nbsp;</li><li>Call being made in business hours[C]</li><li>Program ,task type (including special instructions),advertiser need and readiness [C]</li><li>Related cases [C]</li><li>CMS being used  [C]</li><li>Gtag/GTM/GA already exists  [C] (NA applicable only for Shopping or OCT cases)</li></ul>`:''}
        <ul>
            <li>
                <b>Speakeasy ID: </b> ${seIds || ''}
            </li>
        <br>
        <li>
            <b>Sub-status: </b> ${subStatus || ''}
        </li>
        <br>
        <li>
            <b>Sub-status Reason: </b> ${subStatusReason || ''}
        </li>
        <br>
            <li>
            <b>Tasks Implemented: </b> ${taskImplemented || ''}
        </li>
        <br>
            <li>
            <b>Conversion Ids: </b> ${conversionIds || ''}
        </li>
        <br>
        <li>
            <b>Oncall Comments: </b> ${oncallCmts?oncallCmts.replaceAll('\n','<br>'):''}
        </li>
        <br>
        <li>
                <b>Follow up date: </b> ${flupDateString || 'dd/mm/yyyy'}
            </li>
        </ul>
        `;document.execCommand("insertText",false," ");
        modal.style.display = "none";
        }
        

        // ==== END CODE - VAN BO       
    } catch (error) {
        console.error("tagteamFocusCase => ", error);
    }
    
}
