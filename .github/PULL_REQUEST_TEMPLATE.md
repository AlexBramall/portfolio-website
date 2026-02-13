# Pull Request

<!--
  Thank you for contributing to this project!

  As a Technical Project Manager, I've learned that clear communication is the foundation
  of successful software delivery. This template ensures that every change is well-documented,
  easy to review, and maintains the high standards we've set for this codebase.

  Please take a few minutes to fill out this template. Your future self (and reviewers)
  will thank you!
-->

## 📋 Description

### What does this PR do?
<!-- Provide a clear, concise summary of your changes. What problem does this solve? -->



### Why are we making this change?
<!--
  I believe every change should have a clear business or technical justification.
  Explain the "why" behind this PR - what value does it add? What problem does it solve?
  Link to any related issues, feature requests, or discussions.
-->



## 🎯 Type of Change

<!--
  Categorizing changes helps reviewers understand the scope and risk level.
  As a PM, I've seen how proper categorization improves deployment planning and reduces incidents.
-->

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] 🔧 Configuration change
- [ ] 🧪 Test addition or update
- [ ] 🔒 Security fix

## 🔍 Changes Made

### Technical Changes
<!--
  List the specific technical changes you made. This helps reviewers understand
  the implementation without having to dig through all the code changes.
-->

-
-
-

### Files Modified
<!-- Highlight key files that were changed and why -->

- `path/to/file.ts` -
- `path/to/file2.tsx` -

## 🧪 Testing

<!--
  I require testing information because untested code is a liability.
  Even if we don't have automated tests yet, manual testing verification is crucial.
-->

### How was this tested?
<!-- Describe the testing you performed -->

- [ ] Manual testing in local development
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested responsive design (mobile, tablet, desktop)
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Tested with Sentry error tracking

### Test Scenarios
<!-- List the specific scenarios you tested -->

1.
2.
3.

### Expected Behavior
<!-- What should happen when this code runs? -->



## 📸 Screenshots / Videos

<!--
  Visual changes need visual proof. This dramatically speeds up reviews
  and helps catch UI/UX issues before they reach production.
-->

### Before
<!-- Screenshot or description of the old behavior -->



### After
<!-- Screenshot or description of the new behavior -->



<!-- For UI changes, consider using a tool like Loom or CloudApp to record a quick demo -->

## 🔗 Related Issues

<!--
  Linking to issues creates a clear audit trail and helps with project tracking.
  Use GitHub's automatic closing keywords when applicable.
-->

- Closes #
- Relates to #
- Blocked by #

## 📚 Documentation

<!--
  Good documentation is as important as good code. It ensures knowledge
  transfer and reduces onboarding time for new team members.
-->

- [ ] README updated (if applicable)
- [ ] Code comments added for complex logic
- [ ] TypeScript types/interfaces documented
- [ ] CI/CD guide updated (if deployment process changed)
- [ ] Architecture documentation updated (if structure changed)

## ⚠️ Breaking Changes

<!--
  If this PR includes breaking changes, they need special attention.
  Breaking changes require migration plans and clear communication.
-->

**Does this PR include breaking changes?** No / Yes

<!-- If yes, explain what breaks and provide a migration path -->



## 🚀 Deployment Notes

<!--
  As a PM, I've learned that deployment issues often stem from missed configuration
  or environment-specific details. Document anything special here.
-->

- [ ] No special deployment steps required
- [ ] Environment variables need to be updated (list them below)
- [ ] Database migrations required
- [ ] Third-party service configuration needed
- [ ] CDN cache should be cleared
- [ ] Requires coordination with other deployments

### Deployment Steps
<!-- If special steps are needed, document them here -->



### Rollback Plan
<!-- How do we roll back if something goes wrong? -->



## ✅ Reviewer Checklist

<!--
  This checklist ensures that reviewers (and I) don't miss critical items.
  Consistent review standards maintain code quality across the entire project.
-->

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No console.log or debugging code left in
- [ ] Proper error handling implemented
- [ ] TypeScript types are accurate and not using `any`
- [ ] No hardcoded values (use constants or environment variables)
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Security best practices followed (no exposed secrets, SQL injection prevention, XSS prevention)

### Architecture & Design
- [ ] Changes align with project architecture (components/layout, components/sections, data, hooks, types)
- [ ] Follows separation of concerns principles
- [ ] Reusable components used where appropriate
- [ ] Custom hooks created for reusable logic
- [ ] Data properly typed with TypeScript interfaces

### Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] No memory leaks (event listeners cleaned up)
- [ ] Bundle size impact considered

### Testing & Quality
- [ ] All tests pass locally
- [ ] ESLint shows no errors
- [ ] TypeScript compiles without errors
- [ ] Tested in development environment
- [ ] Error boundaries handle failures gracefully

### Documentation & Communication
- [ ] PR title is clear and descriptive
- [ ] All sections of this template completed
- [ ] Code comments explain "why", not just "what"
- [ ] Complex logic is well-documented

## 🤔 Questions & Concerns

<!--
  Don't hesitate to flag concerns or ask questions. I'd rather discuss
  potential issues before merge than discover them in production.
-->

-
-

## 📝 Additional Context

<!-- Any other context, implementation notes, or details reviewers should know -->



---

<!--
  ## Why This Template?

  As a Technical Project Manager with 10+ years of experience, I've learned that:

  1. **Clear Communication Prevents Issues** - 90% of project failures stem from
     communication breakdowns. This template forces us to think through and articulate
     our changes clearly.

  2. **Documentation Saves Time** - The 10 minutes spent filling this out saves hours
     in review cycles, debugging, and knowledge transfer.

  3. **Consistency Builds Quality** - Using the same structure for every PR creates
     a reliable, predictable process that scales as the team grows.

  4. **Traceability Matters** - Linking PRs to issues, documenting decisions, and
     explaining context creates an audit trail that's invaluable for future work.

  5. **Quality Gates Prevent Technical Debt** - The checklists ensure we maintain
     standards even when moving fast.

  This isn't bureaucracy - it's professional software engineering. Every successful
  project I've led has had similar practices in place.

  Thank you for taking the time to document your work properly! 🙏

  — Alex Bramall
-->
