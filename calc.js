var num = [''];
var op = [];
var last = '';
var ans = '';
var dot = false;
var opening=0;
var closing=0;

$(".btn").click(function (event) {
    var but = event.target.id;
    var type = check(but);
    var last_type = check(last);

    if(but=='('){
        if(last_type=='num'){
            op.push('*');
            op.push('(');
            ans+='(';
            last='(';
            dot=false;
            if(num[num.length-1]!=''){
                num.push('');
            }
            opening++;
        }
        else if(last_type=='func'){
            op.push('(');
            ans+='(';
            last='(';
            dot=false;
            opening++;
        }
        else if(last_type==''){
            op.push('(');
            ans+='(';
            last='(';
            dot=false;
            opening++;
        }
    }
    else if(but==')'){
        if(last_type=='num'){
            op.push(')');
            ans+=')';
            last=')';
            dot=false;
            closing++;
        }
        else if((last==')' || last=='(') && opening>closing){
            op.push(')');
            ans+=')';
            last=')';
            dot=false;
            closing++;
        }
    }

    else if (type == "func") {
        dot = false;
        if(last=='('){

        }
        else if(last==')'){
            op.push(but);
            ans+=but;
            last=but;
            if(num[num.length-1]!=''){
                num.push('');
            }
        }
        else if (num[num.length - 1] != '') {
            op.push(but);
            if(num[num.length-1]!=''){
                num.push('');
            }
            ans = ans + but;
            last=but;
        } 
        else if (op.length != 0) {
            if (but == '-' && (op[op.length - 1] == '*' || op[op.length - 1] == '/' || op[op.length - 1] == '^')) {
                num[num.length-1]='-';
                ans = ans + '-';
                last='-';
            } 
            else {
                op[op.length - 1] = but;
                ans = ans.slice(0, ans.length - 1) + but;
                last=but;
            }
        } 
        else {
            if (but == '-') {
                num[0] = '-';
                ans = ans + '-';
                last='-'
            }
        }
    } 
    else if (type == "num") {
        if(last=='('){
            ans+=but;
            last=but;
            if(num[num.length-1]!=''){
                num.push(but);
            }
            else{
                num[num.length-1]+=but;
            }
            dot=false;
        }
        else if(last==')'){
            op.push('*');
            ans+=but;
            last=but;
            if(num[num.length-1]!=''){
                num.push(but);
            }
            else{
                num[num.length-1]+=but;
            }
            dot=false;
        }
        else if ((last_type == 'func') && but == '.') {
            num[num.length - 1] += '.';
            ans = ans + '.';
            last='.'
        } 
        else if (op.length == 0 && num[0] == '' && but == '.') {
            num[0] = '.';
            ans = '.';
            last='.'
        } 
        else if (dot != true || but != '.') {
            num[num.length - 1] += but;
            ans = ans + but;
            last=but;
        }
        if (but == '.') {
            dot = true;
        }
    } 
    else if (type == "clear") {
        num = [''];
        op = [];
        ans = '';
        last = '';
        dot = false;
        opening=0;
        closing=0;
    } 
    else if (type == "equal") {
        if (last_type != "func" && num.length != 1) {
            while(opening > closing){
                op.push(')');
                closing++;
            }
            while(num[num.length-1]==''){
                num.pop();
            }
            console.log(num);
            console.log(op);
            var converted=postfix(op);
            var res=docal(converted);
            ans=res.toString();
            num=[ans];
            op=[]
            last=ans[ans.length-1];
            dot = false;
        }
    } 
    else if (type == "backspace") {
        if(last_type=='num' || num[num.length-1]=='-'){
            var sec=ans[ans.length-2];
            if(sec==')'){
                op.pop();
            }
            var num_last=num[num.length-1];
            num_last=num_last.slice(0,num_last.length-1);
            num[num.length-1]=num_last;
            if(last=='.'){
                dot=false;
            }
            ans=ans.slice(0,ans.length-1);
            last=ans[ans.length-1];
        }
        else if(last_type=='func' && num[num.length-1]!='-'){
            op.pop();
            num.pop();
            ans=ans.slice(0,ans.length-1);
            last=ans[ans.length-1];
        }
        else if(last=='('){
            var sec=ans[ans.length-2];
            if(check(sec)=='num'){
                op.pop();
            }
            op.pop();
            ans=ans.slice(0,ans.length-1);
            last=ans[ans.length-1];
            opening--;
        }
        else if(last==')'){
            op.pop();
            ans=ans.slice(0,ans.length-1);
            last=ans[ans.length-1];
            closing--;
        }
    }
    if (ans != '') {
        $("#display").text(ans);
    } 
    else {
        $("#display").text('0');
    }
    console.log(num);
    console.log(op);
    console.log(last);
})

function check(but) {
    var ans='';
    if (but == '^' || but == '/' || but == '*' || but == '-' || but == '+') {
        ans = "func";
    } 
    else if (but == '.' || but == '0' || but == '00' || but == '1' || but == '2' || but == '3' || but == '4' || but == '5' || but == '6' || but == '7' || but == '8' || but == '9') {
        ans = "num";
    } 
    else if (but == 'C') {
        ans = "clear";
    } 
    else if (but == '=') {
        ans = "equal";
    } 
    else if (but == 'backspace') {
        ans = "backspace";
    }
    return ans;
}

function docal(input) {
    var stack=[]
    for(var i=0;i<input.length;i++){
        if(check(input[i])=='func'){
            var num1=stack[stack.length-1];
            stack.pop();
            var num2=stack[stack.length-1];
            stack.pop();
            if(input[i]=='+'){
                var curr=num2+num1;
                stack.push(curr);
            }
            else if(input[i]=='-'){
                var curr=num2-num1;
                stack.push(curr);
            }
            else if(input[i]=='*'){
                var curr=num2*num1;
                stack.push(curr);
            }
            else if(input[i]=='/'){
                var curr=num2/num1;
                stack.push(curr);
            }
            else if(input[i]=='^'){
                var curr=Math.pow(num2,num1);
                stack.push(curr);
            }
        }

        else{
            stack.push(Number(input[i]));
        }
    }
    return stack[stack.length-1];
}

function precedence(input) {
    if (input == '(' || input == ')') {
        return 0;
    } 
    else if (input == '^') {
        return 3;
    } 
    else if (input == '*' || input == '/') {
        return 2;
    } 
    else if (input == '+' || input == '-') {
        return 1;
    } 
    else {
        return -1;
    }
}

function postfix(input) {
    var converted = [];
    var stack = []
    var ind = 0;
    for (var i = 0; i < input.length; i++) {
        var type = check(input[i]);
        if ((type == "func" || input[i] == ')' && ind<num.length)) {
            if(num[ind]=='-' || num[ind]=='.' || num[ind]=='-.'){
                converted.push('0');
            }
            else{
            converted.push(num[ind]);
            }
            ind++;
        }

        
            var pre_curr = precedence(input[i]);
            if (stack.length == 0) {
                stack.push(input[i]);
            } 
            else {
                if (input[i] == '(') {
                    stack.push('(');
                } 
                else if (input[i] == ')') {
                    while (stack[stack.length - 1] != '(') {
                        converted.push(stack[stack.length - 1]);
                        stack.pop();
                    }
                    stack.pop();
                } 
                else if (pre_curr > precedence(stack[stack.length - 1])) {
                    stack.push(input[i]);
                } 
                else {
                    while (stack[stack.length - 1] != '(' && precedence(stack[stack.length - 1]) >= pre_curr) {
                        converted.push(stack[stack.length - 1]);
                        stack.pop();
                    }
                    stack.push(input[i]);
                }
            }
    }
    while(ind<num.length){
    converted.push(num[ind]);
    ind++;
    }
    while (stack.length != 0) {
        converted.push(stack[stack.length - 1]);
        stack.pop();
    }

    console.log(converted);
    return converted;
}